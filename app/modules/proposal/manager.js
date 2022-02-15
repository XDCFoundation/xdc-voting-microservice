import fs from "fs";
import ipfsClient from "ipfs-http-client";

const Config = require("../../../config");
const Utils = require("../../utils");

//const { validateRequest } = require("../../../middleware/validation");
const {
    httpConstants,
    apiSuccessMessage,
    apiFailureMessage,
} = require("../../common/constants");
const proposalsSchema = require("../../models/proposals");
const voteSchema = require("../../models/votes");
const addressSchema = require("../../models/addresses");
const emailSchema = require("../../models/email")

export default class BLManager {
    //xinfin-voting-add-new-proposal
    addProposal = async (requestData) => {
        if (!requestData)
            throw "Invalid request";
        const proposalsModelObject = new proposalsSchema(requestData);
        proposalsModelObject.createdOn = Date.now();
        return await proposalsModelObject.save();
    };

    //get-list-of-proposals
    async getProposalList(requestData) {
        // const countData = await proposalsSchema.count()
        const query = [
            {
                $lookup: {
                    from: "votes",
                    localField: "pollingContract",
                    foreignField: "pollingContract",
                    as: "yesVotes"
                },
            },
            {
                "$addFields": {
                    "yesVotes":
                        {
                            "$filter": {
                                "input": "$yesVotes",
                                "as": "yesVotes",
                                "cond": {
                                    "$eq": ["$$yesVotes.support", true]
                                }
                            }
                        }
                }
            },
            {
                $lookup: {
                    from: "votes",
                    localField: "pollingContract",
                    foreignField: "pollingContract",
                    as: "noVotes"
                },
            },
            {
                "$addFields": {
                    "noVotes":
                        {
                            "$filter": {
                                "input": "$noVotes",
                                "as": "noVotes",
                                "cond": {
                                    "$eq": ["$$noVotes.support", false]
                                }
                            }
                        }
                }
            },
            {"$sort": {createdOn: -1}}
        ]
        if (requestData.proposalTitle)
            query.push({$match: {proposalTitle: {"$regex": requestData.proposalTitle, "$options": "i"}}})

        if (requestData.status && requestData.status === 'Open')
            query.push({$match: {endDate: {"$gte": Date.now()}}})

        if (requestData.status && requestData.status === 'Closed')
            query.push({$match: {endDate: {"$lte": Date.now()}}})

        if (requestData.startTime && requestData.endTime)
            query.push({$match: {startDate: {"$gte": requestData.startTime, $lte: requestData.endTime}}})


        const countQuery = [...query, {$count: "totalCount"}]
        const countData = await proposalsSchema.aggregate(countQuery)

        query.push({"$skip": Number(requestData.skip)})
        query.push({"$limit": Number(requestData.limit)})
        const proposalList = await proposalsSchema.aggregate(query)
        return {proposalList, countData: countData[0].totalCount};
    }

    //getlist-of-voters-for-proposal
    async getVotersListByProposal(requestData) {
        const addressDetails = await voteSchema.find(requestData);

        if (!addressDetails)
            return Utils.handleError(
                addressDetails,
                constants.modelMessage.DATA_NOT_FOUND,
                constants.httpConstants.RESPONSE_CODES.FORBIDDEN
            );

        return await addressDetails;
    }

    //getProposalByDate
    async getProposalByDate(requestData) {
        const addressDetails = await proposalsSchema.findData({
            createdOn: {
                $gte: requestData.startDate,
                $lte: requestData.endDate,
            },
        });
        if (!addressDetails)
            return Utils.handleError(
                addressDetails,
                constants.modelMessage.DATA_NOT_FOUND,
                constants.httpConstants.RESPONSE_CODES.FORBIDDEN
            );

        return await addressDetails;
    }

    //getProposalByStatus
    async getProposalByStatus(requestData) {
        const proposalDetails = await proposalsSchema.find({
            status: requestData.status,
        })
            .skip(parseInt(requestData.skip))
            .limit(parseInt(requestData.limit))
        const countPRoposal = await proposalsSchema.findData({
            status: requestData.status,
        }).count()
        if (!proposalDetails)
            return Utils.handleError(
                proposalDetails,
                constants.modelMessage.DATA_NOT_FOUND,
                constants.httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        return await {proposalDetails, countPRoposal};
    }

    //getProposalByProposalAddress
    async getProposalByAddress(requestData) {
        const addressDetails = await proposalsSchema.findData({
            pollingContract: requestData.pollingContract
        });
        if (!addressDetails)
            return Utils.handleError(
                addressDetails,
                constants.modelMessage.DATA_NOT_FOUND,
                constants.httpConstants.RESPONSE_CODES.FORBIDDEN
            );

        return await addressDetails;
    }

    //getTotalProposalList
    async getTotalProposalList() {
        return await proposalsSchema.find().count();
    }

    async getvoterList() {
        return await voteSchema.find().sort({_id: -1});
    }

    //getTotalPassedProposal
    async getPassedProposal() {
        const addressDetails = await proposalsSchema.findData({
            pollingContract: "passed",
        });
        const countPassedProposal = await proposalsSchema.findData({
            pollingContract: "passed",
        }).count();
        if (!addressDetails)
            return Utils.handleError(
                addressDetails,
                constants.modelMessage.DATA_NOT_FOUND,
                constants.httpConstants.RESPONSE_CODES.FORBIDDEN
            );

        return await {addressDetails, countPassedProposal};
    }

    //getPaginatedProposalList
    async getPaginatedProposalList(requestData) {
        try {
            const sort = {_id: -1};
            return await proposalsSchema.find(requestData).sort(sort);
        } catch (error) {
            throw new Error(error);
        }
    }


    async getListOfAddress() {
        return addressSchema.find().skip(0).limit(10);
    }

    //get-list-of-whitelisted-address
    async getListOfWhitelistedAddress(requestData) {
        const query = [
            {
                $lookup: {
                    from: "votes",
                    localField: "_id",
                    foreignField: "voterAddressId",
                    as: "votes"
                }

            },
            {"$sort": {createdOn: -1}}
        ]
        query.push({"$skip": Number(requestData.skip)})
        if (requestData.limit)
            query.push({"$limit": Number(requestData.limit)})
        const response = await addressSchema.aggregate(query);

        const newQuery = [{$count: "totalCount"}];
        const countObj = await addressSchema.aggregate(newQuery);
        return {dataList: response, count: countObj[0].totalCount};

        // const countData = await addressSchema.count()
        // const list = await addressSchema.find()
        //     .skip(parseInt(requestData.skip))
        //     .limit(parseInt(requestData.limit))
        //     .sort(sort)
        // return {count: countData, dataList: list}
    }


    //getSingleProposalDetail
    async getProposalDetail(requestData) {

        const query = [
            {
                $match: {pollingContract: requestData.proposalId}
            },
            {
                $lookup: {
                    from: "votes",
                    localField: "pollingContract",
                    foreignField: "pollingContract",
                    as: "yesVotes"
                },
            },
            {
                "$addFields": {
                    "yesVotes":
                        {
                            "$filter": {
                                "input": "$yesVotes",
                                "as": "yesVotes",
                                "cond": {
                                    "$eq": ["$$yesVotes.support", true]
                                }
                            }
                        }
                }
            },
            {
                $lookup: {
                    from: "votes",
                    localField: "pollingContract",
                    foreignField: "pollingContract",
                    as: "noVotes"
                },
            },
            {
                "$addFields": {
                    "noVotes":
                        {
                            "$filter": {
                                "input": "$noVotes",
                                "as": "noVotes",
                                "cond": {
                                    "$eq": ["$$noVotes.support", false]
                                }
                            }
                        }
                }
            },
            {"$sort": {createdOn: -1}}
        ]

        const proposalList = await proposalsSchema.aggregate(query)
        if (proposalList && proposalList.length)
            return proposalList[0];
        return {}
        // return proposalsSchema.findOne({pollingContract: requestData.proposalId})
    }

    async searchbyaddess(requestData) {
        return addressSchema.findOne({address: requestData.address})
    }


    async totalVotesByVoter(requestData) {
        return await voteSchema.find({voterAddress: requestData.voterAddress})
            .count()
    }

    async addEmail(requestData) {
        if (!requestData)
            throw "Invalid request";
        const emailModelObject = new emailSchema(requestData);
        emailModelObject.createdOn = Date.now();
        return await emailModelObject.save();
    }

    async addDocsToIpfs(requestData) {

        try {
            let fileName = (requestData.fileName).replace(/\s/g, '')
            let key = `${fileName}`;
            let content = fs.readFileSync(basedir + `/uploads/${fileName}`)
            let fileUploadToIPFSResponse = await this.addFileToIPFS(content, key);

            fs.unlinkSync(basedir + `/uploads/${fileName}`)
            let ipfsUrl = Config.IPFS_HOST_URL + fileUploadToIPFSResponse.toString()
            return ipfsUrl
        } catch (err) {
            throw new Error(err);
        }
    }

    addFileToIPFS = async (file, path) => {
        try {
            const ipfs = await ipfsClient.create({
                host: Config.IPFS_IP,
                port: Config.IPFS_PORT,
                protocol: Config.IPFS_PROTOCOL,
            });

            const fileAdded = await ipfs.add({path, content: file});
            if (!fileAdded || !fileAdded.cid) {
                throw "failed to upload file to IPFS"
            }
            return fileAdded.cid;
        } catch (error) {
            throw new Error(error);
        }
    }
}
