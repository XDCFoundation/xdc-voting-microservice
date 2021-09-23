/**
 * Created by AyushK on 18/09/20.
 */
import * as ValidationManger from "../middleware/validation";
import TestModule from "../app/modules/testModule";
import {stringConstants} from "../app/common/constants";
import Proposal from "../app/modules/proposal/index";



module.exports = (app) => {
    app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    /**
     * route definition
     */
    app.post("/add-proposal",ValidationManger.validateAddProposal, new Proposal().addProposal)
    app.get("/getProposalList", new Proposal().getProposalList)
    app.get("/getVotersListByProposal", new Proposal().getVotersListByProposal)
    app.get("/getProposalByDate",new Proposal().getProposalByDate)
    app.get("/getProposalByStatus",new Proposal().getProposalByStatus)
    app.get("/getProposalByAddress",new Proposal().getProposalByAddress)
    app.get("/getPassedProposal",new Proposal().getPassedProposal)
    app.get("/getTotalProposalList",new Proposal().getTotalProposalList)
    
    
   // app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
    
};
