import Utils from "../../utils";
import {
  httpConstants,
  apiSuccessMessage,
  apiFailureMessage,
} from "../../common/constants";

import templateSchema from "../../models/modelTemplate";
import voteSchema from "../../models/votes";
import proposalsSchema from "../../models/proposals";

export default class BLManager {
  ///add_whitelist_address

  addAddress = async (requestData) => {
    const proposalsModelObject = new templateSchema(requestData);
    return await proposalsModelObject.saveData();
  };

  async getAddress(requestData) {
    const findObject = { isDeleted: false };
    const countData = await templateSchema.countData();
    const allAddress = await templateSchema.findData(
      findObject,
      requestData.limit,
      requestData.skip
    );
    return { countData: countData, allAddress: allAddress };
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
        throw Utils.error(
          {},

          apiFailureMessage.INVALID_PARAMS,

          httpConstants.RESPONSE_CODES.FORBIDDEN
        );

      let addressDetails = { modifiedOn: new Date().getTime() };

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

      let findData = templateSchema.findOne({
        address: request.address,
      });

      if (!findData) {
        throw "No such address exists";
      }

      return templateSchema.findOneAndUpdate(
        {
          address: request.address,
        },

        {
          $set: { ...addressDetails },
        },

        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getVotingPercentage(responseData) {
    const notSupported = await voteSchema.countData({ support: false });
    const Supported = await voteSchema.countData({ support: true });
    const totalVotes = notSupported + Supported;

    let supportpercentage = {
      yes: (Supported / totalVotes) * 100,
      No: (notSupported / totalVotes) * 100,
    };

    return supportpercentage;
  }

  async getAllVotersForProposal(requestData) {
    // Utils.lhtLog(
    //   "getAllVotersForProposal",
    //   "getAllVotersForProposal started",
    //   Config.IS_CONSOLE_LOG,
    //   "SohelK"
    // );
    // const [error, isValid] = await Utils.parseResponse(
    //   validateRequest(requestData)
    // );
    // if (error)
    //   return Utils.errorResponse(
    //     error,
    //     error[0].message || apiFailureMessage.INVALID_REQUEST,
    //     httpConstants.RESPONSE_CODES.FORBIDDEN
    //   );

    // const returnResponse = await voteSchema
    //   .find({
    //     pollingContract: requestData.pollingContract,
    //   })
    //   .count();
    // return Utils.response(
    //   returnResponse,
    //   apiSuccessMessage.FETCH_SUCCESS,
    //   httpConstants.RESPONSE_STATUS.SUCCESS,
    //   httpConstants.RESPONSE_CODES.OK
    // );
    // const findObject = { isDeleted: false };
    const countD = await voteSchema
      .find({ pollingContract: requestData.pollingContract })
      .count();
    const allAddress = await voteSchema.findData({
      pollingContract: requestData.pollingContract,
    });
    return { countData: countD, allAddress: allAddress };
  }

  async getTotalCastVotes(requestData) {
    const countD = await voteSchema
      .find({ totalVotes: requestData.totalVotes })
      .count();
    // const allAddress = await voteSchema.findData({
    //   totalVotes: requestData.totalVotes,
    // });
    // return { countData: countD, allAddress: allAddress };
    return { countData: countD };
  }

  async searchProposalUsingName(requestData) {
    if (!requestData || !requestData.proposalTitle)
      throw "proposal title missing";
    const findObj = {
      proposalTitle: { $regex: requestData.proposalTitle, $options: "i" },
    };
    return await proposalsSchema.find(findObj);
  }

  castProposalVote = async (requestData) => {
    try {
      let votersResponse = await voteSchema({
        pollingContract: requestData.pollingContract,
        voterAddress: requestData.voterAddress,
        support: requestData.support,
      });
      if (votersResponse && votersResponse.length) {
        throw apiFailureMessage.SURVEY_ALREADY_EXISTS;
      }
      let surveyObj = new voteSchema(requestData);
      surveyObj.surveyId = surveyObj._id;
      return await surveyObj.save();
    } catch (err) {
      throw err;
    }
  };
}
