import Utils from "../../utils";
// const {​ validateRequest }​ = require("./validation");

import {
  httpConstants,
  apiSuccessMessage,
  apiFailureMessage,
} from "../../common/constants";
// const {​ proposalsModel }​ = require("../../../libraries/common-models")
// const { votesModel } = require("../../../libraries/common-models")

import addressModel from "../../models/modelTemplate";

export default class BLManager {
  ///add_whitelist_address
  // async addAddress(requestData) {
  //   //await validateRequest(requestData)
  //   // Utils.lhtLog("addAddress", "addAddress started", Config.IS_CONSOLE_LOG, "SohelK")
  //   //  Cloud Function business logic

  //   const [error, isValid] = await UtilMethods.parseResponse(
  //     validateRequest(requestData)
  //   );
  //   if (error)
  //     throw Utils.errorResponse(
  //       error,
  //       error[0].message || apiFailureMessage.INVALID_REQUEST,
  //       httpConstants.RESPONSE_CODES.FORBIDDEN
  //     );

  //   const clinicDeltais = await addressModel.findOneData({
  //     address: requestData.address,
  //   });
  //   if (clinicDetails)
  //     return Utils.errorResponse(
  //       constants.modelMessage.DATA_EXIST,
  //       constants.modelMessage.DATA_EXIST,
  //       httpConstants.RESPONSE_CODES.NOT_FOUND
  //     );
  //   const addressDetailsObject = {
  //     address: requestData.address,
  //     permission: {
  //       allowVoting: requestData.allowVoting,
  //       allowProposalCreation: requestData.allowProposalCreation,
  //     },
  //   };
  //   const clinicModelObject = new addressModel(addressDetailsObject);
  //   const returnResponse = await clinicModelObject.addData();
  //   return Utils.response(
  //     returnResponse,
  //     apiSuccessMessage.FETCH_SUCCESS,
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }

  addAddress = async (requestData) => {
    try {
      let addressResponse = await addressModel.find({
        address: requestData.address,
      });
      if (addressResponse && addressResponse.length) {
        throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
      }
      let addressObj = new addressModel(requestData);
      // surveyObj.surveyId = surveyObj._id;
      return await addressObj.save();
    } catch (err) {
      throw err;
    }
  };

  async getAddresses(requestData) {
    const addressDetails = await addressModel
      .findData()
      .limit(parseInt(requestData.limit));

    if (!addressDetails)
      throw UtilMethods.errorResponse(
        constants.modelMessage.DATA_EXIST,
        constants.modelMessage.DATA_EXIST,
        httpConstants.RESPONSE_CODES.NOT_FOUND
      );
    const totalCount = await addressModel.countData();
    console.log("this is ", totalCount);
    addressDetails["totalRecord"] = "testdata";

    return UtilMethods.structuredResponse(
      addressDetails,
      apiSuccessMessage.FETCH_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
}
