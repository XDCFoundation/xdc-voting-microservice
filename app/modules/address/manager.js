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
    try {
      let addressResponse = await templateSchema.find({
        address: requestData.address,
      });
      if (addressResponse && addressResponse.length) {
        throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
      }
      let addressObj = new templateSchema(requestData);
      // surveyObj.surveyId = surveyObj._id;
      return await addressObj.save();
    } catch (err) {
      throw err;
    }
  };

  async getAddress(requestData) {
    const findObject = { isDeleted: false };
    return await templateSchema.findData(
      findObject,
      requestData.limit,
      requestData.skip
    );
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
  async deleteAddress(requestData) {
    // await validateRequest(requestData);

    // UtilMethods.lhtLog(
    //   "deleteAddress",
    //   "deleteAddress started",
    //   Config.IS_CONSOLE_LOG,
    //   "SohelK"
    // );

    //  Cloud Function business logic
    const addressDetails = await addressModel.findOneData({
      address: requestData.address,
    });
    if (!addressDetails)
      return Utils.handleError(
        addressDetails,
        constants.modelMessage.DATA_NOT_FOUND,
        constants.httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    var returnResponse;
    try {
      returnResponse = await addressModel.findOneAndDelete({
        address: requestData.address,
      });
    } catch (err) {
      returnResponse = err;
    }
    return Utils.response(
      returnResponse,
      constants.apiSuccessMessage.FETCH_SUCCESS,
      constants.httpConstants.RESPONSE_STATUS.SUCCESS,
      constants.httpConstants.RESPONSE_CODES.OK
    );
  }
  // async deleteFamilyMember(request) {
  //   try {
  //     if (!request)
  //       throw Utils.error(
  //         {},
  //         apiFailureMessage.INVALID_PARAMS,
  //         httpConstants.RESPONSE_CODES.FORBIDDEN
  //       );
  //     await UserModel.findOneAndUpdate(
  //       {
  //         "personalInfo.familyMembers": mongoose.Types.ObjectId(
  //           request.memberId
  //         ),
  //       },
  //       {
  //         $pull: {
  //           "personalInfo.familyMembers": mongoose.Types.ObjectId(
  //             request.memberId
  //           ),
  //         },
  //       }
  //     );
  //     await familyModel.findOneAndDelete({
  //       memberId: request.memberId,
  //     });
  //     return {};
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
