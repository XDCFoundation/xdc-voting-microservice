/**
 * Created by AyushK on 18/09/20.
 */
import * as ValidationManger from "../middleware/validation";
import TestModule from "../app/modules/testModule";
import { stringConstants } from "../app/common/constants";
import Address from "../app/modules/address";

module.exports = (app) => {
  app.get("/", (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

  /**
   * route definition
   */
  //   app.get(
  //     "/test-route",
  //     ValidationManger.validateUserLogin,
  //     new TestModule().testRoute
  //   );
  app.post(
    "/add-address",
    // ValidationManger.validateUserLogin,
    new Address().addAddress
  );
  app.post(
    "/get-address",
    // ValidationManger.validateUserLogin,
    new Address().getAddress
  );
  app.delete(
    "/delete-address",
    // ValidationManger.validateUserLogin,
    new Address().getAddress
  );
};
