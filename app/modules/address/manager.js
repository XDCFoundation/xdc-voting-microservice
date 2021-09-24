import Utils from "../../utils";
// const {​ validateRequest }​ = require("./validation");

import {
  httpConstants,
  apiSuccessMessage,
  apiFailureMessage,
} from "../../common/constants";
// const {​ proposalsModel }​ = require("../../../libraries/common-models")
// const { votesModel } = require("../../../libraries/common-models")

import templateSchema from "../../models/modelTemplate";
import { object } from "yup";

export default class BLManager {
  ///add_whitelist_address

  addAddress = async (requestData) => {
    // try {
    //   let addressResponse = await templateSchema.find({
    //     address: requestData.address,
    //   });
    //   if (addressResponse && addressResponse.length) {
    //     throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
    //   }
    //   let addressObj = new templateSchema(requestData);
    //   // surveyObj.surveyId = surveyObj._id;
    //   return await addressObj.saveData();
    // } catch (err) {
    //   throw err;
    // }
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
  async updateAddress(requestData) {
    // UtilMethods.lhtLog(
    //   "updateAddress",
    //   "updateAddress started",
    //   Config.IS_CONSOLE_LOG,
    //   "SohelK"
    // );
    const [error, isValid] = await Utils.parseResponse(
      validateRequest(requestData)
    );
    if (error)
      return Utils.errorResponse(
        error,
        error[0].message || apiFailureMessage.INVALID_REQUEST,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    const addressDetails = await addressModel.findOneData({
      address: requestData.address,
    });
    if (!addressDetails)
      return Utils.handleError(
        addressDetails,
        constants.modelMessage.DATA_NOT_FOUND,
        constants.httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    const updateObject = {
      address: requestData.updateAddress,
      permission: {
        allowVoting: requestData.allowVoting,
        allowProposalCreation: requestData.allowProposalCreation,
      },
      totalVotes: requestData.totalVotes,
    };
    const returnResponse = await addressModel.updateData(
      { address: requestData.address },
      updateObject
    );
    return Utils.Response(
      returnResponse,
      apiSuccessMessage.FETCH_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
}
