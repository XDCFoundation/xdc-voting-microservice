import Utils from "../../utils";
import BLManager from "./manager";
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
export default class FamilyController {
  async addAddress(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().addAddress(request.body)
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
}
