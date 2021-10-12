/**
 * Created by AyushK on 18/09/20.
 */
import * as ValidationManger from "../middleware/validation";
import { stringConstants } from "../app/common/constants";
import Address from "../app/modules/address";
import Proposal from "../app/modules/proposal";

module.exports = (app) => {
  app.get("/", (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));
  app.post("/add-address", new Address().addAddress);
  app.post("/get-address", new Address().getAddress);
  app.delete("/delete-address", new Address().deleteAddress);
  app.put("/update-address", new Address().updateAddress);
  app.get("/getVotingPercentage", new Address().getVotingPercentage);
  app.get("/getAllVotersForProposal", new Address().getAllVotersForProposal);
  app.get("/getTotalCastVotes", new Address().getTotalCastVotes);
  app.post("/searchProposalUsingName", new Address().searchProposalUsingName);

  /**
   * route definition
   */
  app.post("/add-proposal", ValidationManger.validateAddProposal, new Proposal().addProposal);
  app.get("/getProposalList", new Proposal().getProposalList);
  app.get("/getVotersListByProposal", new Proposal().getVotersListByProposal);
  app.get("/getProposalByDate", new Proposal().getProposalByDate);
  app.get("/getProposalByStatus", new Proposal().getProposalByStatus);
  app.get("/getProposalByAddress", new Proposal().getProposalByAddress);
  app.get("/getPassedProposal", new Proposal().getPassedProposal);
  app.get("/getTotalProposalList", new Proposal().getTotalProposalList);
  app.get("/getPaginatedProposalList", new Proposal().getPaginatedProposalList);
  app.get("/getListOfAddress",new Proposal().getListOfAddress);
  app.get("/getListOfWhitelistedAddress",new Proposal().getListOfWhitelistedAddress);
  app.get("/getProposalDetail/:proposalId",ValidationManger.validateProposalDetail,new Proposal().getProposalDetail);
  app.get("/searchbyaddess/:address",ValidationManger.validatesearchbyaddess,new Proposal().searchbyaddess);
  

  // app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
};
