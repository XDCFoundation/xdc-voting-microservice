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
  async addAddress(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().addNewAddress(request.body)
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
  async deleteGroups(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().deleteAddressGroups(request.body)
    );
    if (!getRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getRes,
      "Data deleted successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async updateAddress(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().updateAddress(request.body)
    );
    if (!getRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getRes,
      "Data updated successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getVotingPercentage(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().getVotingPercentage(request.params)
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
  async getAllVotersForProposal(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().getAllVotersForProposal(request.body)
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
  async getTotalCastVotes(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().getTotalCastVotes(request.body)
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

  async castProposalVote(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().castProposalVote(request.body)
    );
    if (!getRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getRes,
      "voted successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async addressSearch(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().addressSearch(request.body)
    );
    if (!getRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getRes,
      "address searched successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
}
