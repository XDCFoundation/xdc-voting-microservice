import BLManager from "./manager";
import Utils from "../../utils";
import {
    apiSuccessMessage,
    apiFailureMessage,
    httpConstants,
} from "../../common/constants";

export default class proposalController {
    //xinfin-voting-add-new-proposal
    async addProposal(req, res) {
        if (!req || !req.body || Object.keys(req.body).length < 1)
            return Utils.response(res, {}, apiFailureMessage.INVALID_REQUEST, httpConstants.RESPONSE_STATUS.FAILURE, httpConstants.RESPONSE_CODES.BAD_REQUEST);
        let [err, response] = await Utils.parseResponse(new BLManager().addProposal(req.body))
        if (err)
            return Utils.response(res, err, apiFailureMessage.INTERNAL_SERVER_ERROR, httpConstants.RESPONSE_STATUS.FAILURE, httpConstants.RESPONSE_CODES.NOT_FOUND);
        return Utils.response(res, response, apiSuccessMessage.ADD_PROPOSAL_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
    }

    //get-list-of-proposals
    async getProposalList(req, res) {
       

        let response = await new BLManager()
            .getProposalList(req.body)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }

    //getVotersListByProposal
    async getVotersListByProposal(req, res) {

        let response = await new BLManager()
            .getVotersListByProposal(req.body)
            .catch((err) => {
                return Utils.response(
                    response,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }

    //getProposalByDate
    async getProposalByDate(req, res) {
        if (!req || !req.body || Object.keys(req.body).length < 1)
            return Utils.response(
                res,
                {},
                apiFailureMessage.INVALID_REQUEST,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.BAD_REQUEST
            );

        let response = await new BLManager()
            .getProposalByDate(req.body)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }

    //getProposalByStatus

    async getProposalByStatus(req, res) {
        if (!req || !req.body || Object.keys(req.body).length < 1)
            return Utils.response(
                res,
                {},
                apiFailureMessage.INVALID_REQUEST,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.BAD_REQUEST
            );

        let response = await new BLManager()
            .getProposalByStatus(req.body)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }

    // getProposalByProposalAddress
    async getProposalByAddress(req, res) {
        if (!req || !req.body || Object.keys(req.body).length < 1)
            return Utils.response(
                res,
                {},
                apiFailureMessage.INVALID_REQUEST,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.BAD_REQUEST
            );

        let response = await new BLManager()
            .getProposalByAddress(req.body)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }

    //getTotalProposalList
    async getTotalProposalList(req, res) {

        let response = await new BLManager()
            .getTotalProposalList(req.body)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }



    async getvoterList(req, res) {

        let response = await new BLManager()
            .getvoterList(req.body)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }





    //getTotalPassedProposal
    async getPassedProposal(req, res) {
        if (!req || !req.body || Object.keys(req.body).length < 1)
            return Utils.response(
                res,
                {},
                apiFailureMessage.INVALID_REQUEST,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.BAD_REQUEST
            );

        let response = await new BLManager()
            .getPassedProposal(req.body)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }

    //getPaginatedProposalList
    async getPaginatedProposalList(req, res) {
        if (!req || !req.body || Object.keys(req.body).length < 1)
            return Utils.response(
                res,
                {},
                apiFailureMessage.INVALID_REQUEST,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.BAD_REQUEST
            );

        let response = await new BLManager()
            .getPaginatedProposalList(req.body)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }

    //getListOfAddress
    async getListOfAddress(req, res) {

        let response = await new BLManager()
            .getListOfAddress(req.body)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }


    //getListOfWhitelistedAddress
    async getListOfWhitelistedAddress(req, res) {
        let response = await new BLManager()
            .getListOfWhitelistedAddress(req.body)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }


    //getSingleProposalDetail
    async getProposalDetail(req, res) {
        let response = await new BLManager()
            .getProposalDetail(req.params)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }

    //searchbyaddess
    async searchbyaddess(req, res) {
        let response = await new BLManager()
            .searchbyaddess(req.params)
            .catch((err) => {
                return Utils.response(
                    res,
                    {err},
                    apiFailureMessage.INTERNAL_SERVER_ERROR,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            });
        if (!response)
            return Utils.response(
                res,
                {},
                apiFailureMessage.NOT_FOUND,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.NOT_FOUND
            );

        return Utils.response(
            res,
            response,
            apiSuccessMessage.ADD_SUCCESS,
            httpConstants.RESPONSE_STATUS.SUCCESS,
            httpConstants.RESPONSE_CODES.OK
        );
    }

}
