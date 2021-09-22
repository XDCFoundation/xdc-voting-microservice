const Config = require("../../../config");
const Utils = require("../../utils");
//const { validateRequest } = require("../../../middleware/validation");
const { httpConstants, apiSuccessMessage,apiFailureMessage } = require("../../common/constants");
const  proposalsSchema  = require("../../models/proposals")
const  voteSchema  = require("../../models/votes")

export default class BLManager {


    //xinfin-voting-add-new-proposal
    addProposal = async (requestData) => {

        const proposalsModelObject = new proposalsSchema(requestData)
        return await proposalsModelObject.addData();

       
    }

    //get-list-of-proposals
    async getProposalList(requestData) {
        try{
          ;

            return await proposalsSchema.find(requestData)
        }
        catch(error){
            console.log(error)
        }
       

       
    }


    //getlist-of-voters-for-proposal
    async getVotersListByProposal(requestData) {
       
       try{


       
          const addressDetails = await voteSchema.findData({ pollingContract: requestData.pollingContract });

          if (!addressDetails) return Utils.handleError(addressDetails, constants.modelMessage.DATA_NOT_FOUND, constants.httpConstants.RESPONSE_CODES.FORBIDDEN);

        return await addressDetails 


        }
        catch(error){
            console.log(error)
        }
       
       
    }

    //getProposalByDate
    async getProposalByDate(requestData) {
       
        
         const addressDetails =  await await proposalsSchema.findData({createdOn: {
            $gte: requestData.startDate, 
            $lte: requestData.endDate
        }});
        if (!addressDetails) return Utils.handleError(addressDetails, constants.modelMessage.DATA_NOT_FOUND, constants.httpConstants.RESPONSE_CODES.FORBIDDEN);
        
        return await addressDetails

     }


     //getProposalByStatus
     async getProposalByStatus(requestData) {
       
        
        const proposalDetails = await proposalsSchema.findData({ status: requestData.status });
         if (!proposalDetails) return Utils.handleError(proposalDetails, constants.modelMessage.DATA_NOT_FOUND, constants.httpConstants.RESPONSE_CODES.FORBIDDEN);
        return await proposalDetails
    } 


    //getProposalByProposalAddress
    async getProposalByAddress(requestData) {
       
       
        const addressDetails = await proposalsSchema.findOne({ address: requestData.address });
         if (!addressDetails) return Utils.handleError(addressDetails, constants.modelMessage.DATA_NOT_FOUND, constants.httpConstants.RESPONSE_CODES.FORBIDDEN);
        
        return await addressDetails
    
    }


    //getTotalProposalList
    async getTotalProposalList(requestData) {
        
        return await proposalsSchema.find().count();

        
    }

    //getTotalPassedProposal
    async getPassedProposal() {
       
        
        const addressDetails = await proposalsSchema.findData({pollingContract: "passed"});
        if (!addressDetails) return Utils.handleError(addressDetails, constants.modelMessage.DATA_NOT_FOUND, constants.httpConstants.RESPONSE_CODES.FORBIDDEN);

        return await addressDetails
      
    }

           
}

