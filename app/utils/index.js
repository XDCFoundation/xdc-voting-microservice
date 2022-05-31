/**
 * Created by AyushK on 18/09/20.
 */

"use strict";
import { apiFailureMessage, httpConstants } from "../common/constants";

export default class Utils {
  static response(res, data, message, success, code) {
    const responseObj = {
      responseData: data,
      message: message,
      success: success,
      responseCode: code,
    };
    res.format({
      json: () => {
        res.send(responseObj);
      },
    });
  }
  static parseGetContentRequest = (requestObj) => {
    if (!requestObj) return {};
    let skip = 0;
    if (requestObj.skip || requestObj.skip === 0) {
      skip = requestObj.skip;
      delete requestObj.skip;
    }
    let limit = 0;
    if (requestObj.limit) {
      limit = requestObj.limit;
      delete requestObj.limit;
    }
    let sortingKey = { addedOn: -1 };
    if (requestObj.sortingKey) {
      sortingKey = requestObj.sortingKey;
      delete requestObj.sortingKey;
    }
    let selectionKeys = "";
    if (requestObj.selectionKeys) {
      selectionKeys = requestObj.selectionKeys;
      delete requestObj.selectionKeys;
    }
    let searchQuery = [];
    if (
        requestObj.searchKeys &&
        requestObj.searchValue &&
        Array.isArray(requestObj.searchKeys) &&
        requestObj.searchKeys.length
    ) {
      requestObj.searchKeys.map((searchKey) => {
        let searchRegex = { $regex: requestObj.searchValue, $options: "i" };
        searchQuery.push({ [searchKey]: searchRegex });
      });
      requestObj["$or"] = searchQuery;
    }
    if (requestObj.searchKeys) delete requestObj.searchKeys;
    if (requestObj.searchValue) delete requestObj.searchValue;
    return {
      requestData: requestObj,
      skip: skip,
      limit: limit,
      sortingKey: sortingKey,
      selectionKeys: selectionKeys,
    };
  };
  static responseForValidation(res, errorArray, success, code = 400) {
    const responseObj = {
      message: "Invalid Request",
      errors: errorArray,
      success: success,
      responseCode: code,
    };
    res.format({
      json: () => {
        res.send(responseObj);
      },
    });
  }

  static handleError(err, req, res) {
    if (!res) {
      return false;
    }
    err = err || {};
    const msg = err.message
      ? err.message
      : err
      ? err
      : apiFailureMessage.INTERNAL_SERVER_ERROR;
    const code = err.code
      ? err.code
      : httpConstants.RESPONSE_CODES.SERVER_ERROR;
    this.response(res, {}, msg, httpConstants.RESPONSE_STATUS.FAILURE, code);
  }

  /**
   * This function is made to handle success and error callback!
   * @param promise
   * @returns {Promise<Promise|Bluebird<*[] | R>|Bluebird<any | R>|*|Promise<T | *[]>>}
   */
  static async parseResponse(promise) {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [err]);
  }

  /**
   * To throw error
   * @param data
   * @param message
   * @param code
   * @returns {{code: number, data: *, message: *}}
   */
  static error(data, message, code = 500) {
    return {
      data: data,
      message: message,
      code: code,
    };
  }

  static getFormattedDate() {
    const date = new Date();
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  }

  /**
   * @param functionName
   * @param message
   * @param payload:should be in object form
   * @param developerAlias
   * @param logType ["INFO", "WARNING", "ERROR"]
   * @constructor
   */
  static lhtLog(
    functionName,
    message,
    payload,
    developerAlias,
    logType = "INFO"
  ) {
    console.log(
      `[ ${this.getFormattedDate()} ] ${logType}: ${functionName}: ${message}: ${JSON.stringify(
        payload
      )}: Developer : ${developerAlias}`
    );
  }
}
