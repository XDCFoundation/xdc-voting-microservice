import Utils from "../../utils";
import {httpConstants, apiSuccessMessage, apiFailureMessage,} from "../../common/constants";

import addressGroups from "../../models/addressGroups";
import VoteSchema from "../../models/votes";
import proposalsSchema from "../../models/proposals";

export default class BLManager {
    ///add_whitelist_address
    addNewGroup = async (requestData) => {

        const addressDetails = await addressGroups.find({name: requestData.name, isDeleted: false})
        console.log('addressDetails ',addressDetails)
        if (addressDetails && addressDetails.length)
            throw Utils.error({}, apiFailureMessage.GROUP_ALREADY_EXISTS, httpConstants.RESPONSE_CODES.BAD_REQUEST);
        const addressesInstance = new addressGroups(requestData);
        return await addressesInstance.save();
    };


    addNewAddress = async (requestData) => {

        const addressDetails = await addressGroups.findOne({_id: requestData._id, isDeleted: false})
        if(!addressDetails)
           throw Utils.error({}, apiFailureMessage.GROUP_NOT_FOUND, httpConstants.RESPONSE_CODES.NOT_FOUND);
    
      
       return await addressGroups.updateOne({_id: requestData._id}, {'$set': requestData,addressess:[...addressDetails.addressess,requestData.addressess]}, {multi: true})
           // if (addressDetails.addressess.includes(requestData.addressess))
        //      throw Utils.error({}, apiFailureMessage.ADDRESS_ALREADY_EXISTS, httpConstants.RESPONSE_CODES.BAD_REQUEST);
        // return await addressGroups.findOneAndUpdate({ name:requestData.name }, {addressess:[...addressDetails.addressess,requestData.addressess] });
         
    }; 


    async getGroupList(requestData) {
        let groupDetails=Utils.parseGetContentRequest(requestData)
        return await addressGroups.getFilteredData(
           { ...groupDetails.requestData,
            isDeleted :false
        },
         groupDetails.selectionKeys,
         groupDetails.skip,
         groupDetails.limit,
         groupDetails.sortingKey

        )
       
    }

    async deleteAddressGroups(request) {

        return addressGroups.updateOne({_id: request._id }, {
         $pull: { 'addressess': request.addressess}

        });

      }

}
