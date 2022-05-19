import Utils from "../../utils";
import BLManager from "./manager";
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
export default class Manager {
  async addGroup(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().addNewGroup(request.body)
    );
    if (!getRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getRes,
      "Data added successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );

  }
  async updateAddressGroup(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().updateAddressGroup(request.body)
    );
    if (!getRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getRes,
      "Data added successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );

  }
  async getGroups(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().getGroupList(request.body)
    );
    if (!getRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getRes,
      apiSuccessMessage.FETCH_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  // async deleteGroup(request, response) {
  //   const [error, getRes] = await Utils.parseResponse(
  //     new BLManager().deleteAddressGroups(request.body)
  //   );
  //   if (!getRes) {
  //     return Utils.handleError(error, request, response);
  //   }
  //   return Utils.response(
  //     response,
  //     getRes,
  //     "Data deleted successfully",
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }
  
}
