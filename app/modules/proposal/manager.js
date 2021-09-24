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
    const proposalsModelObject = new proposalsSchema(requestData);
    return await proposalsModelObject.addData();
  };

  //get-list-of-proposals
  async getProposalList(requestData) {
    const proposalList = await proposalsSchema.find(requestData);

    return proposalList;
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
    const proposalDetails = await proposalsSchema.findData({
      status: requestData.status,
    });
    if (!proposalDetails)
      return Utils.handleError(
        proposalDetails,
        constants.modelMessage.DATA_NOT_FOUND,
        constants.httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    return await proposalDetails;
  }

  //getProposalByProposalAddress
  async getProposalByAddress(requestData) {
    const addressDetails = await proposalsSchema.findData({
      pollingContract: requestData.pollingContract,
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

  //getTotalPassedProposal
  async getPassedProposal() {
    const addressDetails = await proposalsSchema.findData({
      pollingContract: "passed",
    });
    if (!addressDetails)
      return Utils.handleError(
        addressDetails,
        constants.modelMessage.DATA_NOT_FOUND,
        constants.httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    return await addressDetails;
  }

  //getPaginatedProposalList
  async getPaginatedProposalList(requestData) {
    try {
      const sort = { _id: -1 };
      return await proposalsSchema.find(requestData).sort(sort);
    } catch (error) {
      console.log(error);
    }
  }
}
