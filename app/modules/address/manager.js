import Utils from "../../utils";
import {
    httpConstants,
    apiSuccessMessage,
    apiFailureMessage,
} from "../../common/constants";

import templateSchema from "../../models/modelTemplate";
import VoteSchema from "../../models/votes";
import proposalsSchema from "../../models/proposals";

export default class BLManager {
    ///add_whitelist_address

    addAddress = async (requestData) => {
        const proposalsModelObject = new templateSchema(requestData);
        return await proposalsModelObject.saveData();
    };

    async getAddress(requestData) {
        const findObject = {isDeleted: false};
        const countData = await templateSchema.countData();
        const allAddress = await templateSchema.findData(
            findObject,
            requestData.limit,
            requestData.skip
        );
        return {countData: countData, allAddress: allAddress};
        // console.log("=========", response);
        // const addressDetails = await templateSchema
        //   .findData(requestData)
        //   .limit(parseInt(requestData.limit));
        // if (!addressDetails)
        //   throw Utils.handleError(
        //     constants.modelMessage.DATA_EXIST,
        //     constants.modelMessage.DATA_EXIST,
        //     httpConstants.RESPONSE_CODES.NOT_FOUND
        //   );
        // const totalCount = await templateSchema.countData();
        // console.log("this is ", totalCount);
        // addressDetails["totalRecord"] = "testdata";
        // return Utils.response(
        //   addressDetails,
        //   apiSuccessMessage.FETCH_SUCCESS,
        //   httpConstants.RESPONSE_STATUS.SUCCESS,
        //   httpConstants.RESPONSE_CODES.OK
        // );
    }

    async deleteAddress(request) {
        if (!request)
            throw Utils.error(
                {},
                apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        return templateSchema.findOneAndDelete(
            {
                address: request.address,
            },
            {
                $set: {
                    isActive: 0,
                    isDeleted: 1,
                },
            }
        );
    }

    async updateAddress(request) {
        try {
            if (!request || !request.address)
                throw Utils.error({}, apiFailureMessage.INVALID_PARAMS, httpConstants.RESPONSE_CODES.FORBIDDEN);
            let addressDetails = {modifiedOn: new Date().getTime()};
            if (request.address) addressDetails["address"] = request.updateAddress;
            if (request.permission) {
                let permission = {};
                if (request.permission.allowVoting)
                    permission["allowVoting"] = request.permission.allowVoting;

                if (request.permission.allowProposalCreation)
                    permission["allowProposalCreation"] =
                        request.permission.allowProposalCreation;
                addressDetails["permission"] = permission;
            }
            if (request.totalVotes) addressDetails["totalVotes"] = request.totalVotes;

            let findData = templateSchema.findOne({address: request.address,});
            if (!findData) {
                throw "No such address exists";
            }

            return templateSchema.findOneAndUpdate(
                {
                    address: request.address,
                },

                {
                    $set: {...addressDetails},
                },

                {new: true}
            );
        } catch (error) {
            throw error;
        }
    }

    async getVotingPercentage(responseData) {
        if(!responseData.proposalId)
            throw "proposalId is required"
        const notSupported = await VoteSchema.countData({support: false, pollingContract: responseData.proposalId});
        const Supported = await VoteSchema.countData({support: true, pollingContract: responseData.proposalId});
        let totalVotes = notSupported + Supported;
        if(totalVotes==0){
            totalVotes=totalVotes+1
        }
        let voteSupport=Supported / totalVotes
        let voteNotSupport=notSupported / totalVotes
        
        
        let supportpercentage = {
            yes: voteSupport * 100,
            No: voteNotSupport * 100,
        };

        return {supportpercentage};
    }

    async getAllVotersForProposal(requestData) {
        const countD = await VoteSchema
            .find({pollingContract: requestData.pollingContract})
            .count();
        const allAddress = await VoteSchema.findData({
            pollingContract: requestData.pollingContract,
        });
        return {countData: countD, allAddress: allAddress};
    }

    async getTotalCastVotes(requestData) {
        const countD = await VoteSchema
            .find({totalVotes: requestData.totalVotes})
            .count();
        return {countData: countD};
    }

    async searchProposalUsingName(requestData) {
        if (!requestData || !requestData.proposalTitle)
            throw "proposal title missing";
        const findObj = {
            proposalTitle: {$regex: requestData.proposalTitle, $options: "i"},
        };
        return proposalsSchema.find(findObj)
        .skip(parseInt(requestData.skip))
        .limit(parseInt(requestData.limit))
        .sort({createdOn: -1})
;
    }

    castProposalVote = async (requestData) => {
        let votersResponse = await VoteSchema.findData({
            pollingContract: requestData.pollingContract,
            voterAddress: requestData.voterAddress
        });
        if (votersResponse && votersResponse.length) {
            throw apiFailureMessage.SURVEY_ALREADY_EXISTS;
        }
        let surveyObj = new VoteSchema(requestData);
        surveyObj.surveyId = surveyObj._id;
        return await surveyObj.save();
    };
}
