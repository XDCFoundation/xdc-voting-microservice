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

export default class BLManager {
    //xinfin-voting-add-new-proposal
    addProposal = async (requestData) => {
        if (!requestData)
            throw "Invalid request";
        const proposalsModelObject = new proposalsSchema(requestData);
        return await proposalsModelObject.save();
    };

    //get-list-of-proposals
    async getProposalList(requestData) {
        const sort = {createdOn: -1};
        const countData = await proposalsSchema.count()
        const proposalList = await proposalsSchema.find()
            .skip(parseInt(requestData.skip))
            .limit(parseInt(requestData.limit))
            .sort(sort)

        // return proposalsSchema.aggregate([
        //     {
        //         $lookup: {
        //             from: "votes",
        //             localField: "pollingContract",
        //             foreignField: "pollingContract",
        //             as: "yesVotes"
        //         },
        //     },
        //     {
        //         "$addFields": {
        //             "yesVotes":
        //                     {
        //                         "$filter": {
        //                             "input": "$yesVotes",
        //                             "as": "yesVotes",
        //                             "cond": {
        //                                 "$eq": [ "$$yesVotes.support", true ]
        //                             }
        //                         }
        //                     }
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "votes",
        //             localField: "pollingContract",
        //             foreignField: "pollingContract",
        //             as: "noVotes"
        //         },
        //     },
        //     {
        //         "$addFields": {
        //             "noVotes":
        //                 {
        //                     "$filter": {
        //                         "input": "$noVotes",
        //                         "as": "noVotes",
        //                         "cond": {
        //                             "$eq": [ "$$noVotes.support", false ]
        //                         }
        //                     }
        //                 }
        //         }
        //     },
        //     { "$sort":{createdOn: -1}},
        //     { "$skip": requestData.skip },
        //     { "$limit":requestData.limit }
        // ])

        //return Utils.handleError(proposalList, constants.modelMessage.DATA_NOT_FOUND, constants.httpConstants.RESPONSE_CODES.FORBIDDEN);
         return {proposalList, countData};
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
            console.log(error);
        }
    }


    async getListOfAddress() {
        return await addressSchema.find().skip(0).limit(10);
    }

    //get-list-of-whitelisted-address
    async getListOfWhitelistedAddress(requestData) {
        const sort = {createdOn: -1};
        const countData = await addressSchema.count()
        const list = await addressSchema.find()
            .skip(parseInt(requestData.skip))
            .limit(parseInt(requestData.limit))
            .sort(sort)


        return await {
            count: countData,
            dataList: list
        }

    }


    //getSingleProposalDetail
    async getProposalDetail(requestData) {

        return await proposalsSchema.findOne(
            {pollingContract: requestData.proposalId}
        )


    }

    async searchbyaddess(requestData) {

        return await addressSchema.findOne(
            {address: requestData.address}
        )


    }


    // async deleteProposal(request) {
    //     if (!request)
    //         throw Utils.error(
    //             {},
    //             apiFailureMessage.INVALID_PARAMS,
    //             httpConstants.RESPONSE_CODES.FORBIDDEN
    //         );
    //     return proposalsSchema.deleteOne(
    //         {
    //             pollingContract: request.proposalId,
    //         }
    //     );
    // }


}
