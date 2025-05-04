const express = require("express");
const controller = require("../controllers/wallet");
const commonController = require("../controllers/common");
const router = express.Router();
const responseHandler = require("../lib/responseHandler");
const commonFunctions = require("../utils/commonFunctions");
const constants = require("../utils/constants");

router.post("/addMoney", async (req, res) => {
  try {
    /** Req Body */
    const reqBody = req.body.reqBody;
    /** Get table Name */
    const getUsersTableDetails = commonFunctions.getTableDetails("USERS");
    const getFundsTableDetails =
      commonFunctions.getTableDetails("FUND_TRANSACTIONS"); //fund_transactions

    const senderUserFilter = {
      field: "id",
      op: "IN",
      value: [reqBody.sender_id],
    };
    const receiverUserFilter = {
      field: "id",
      op: "IN",
      value: [reqBody.receiver_id],
    };
    let senderUserDetails = await commonController.filters(
      senderUserFilter,
      getUsersTableDetails
    );
    let receiverUserDetails = await commonController.filters(
      receiverUserFilter,
      getUsersTableDetails
    );
    if (senderUserDetails.length == 0 || receiverUserDetails == 0) {
      throw { message: "Please send valid sender and receiver details!!!" };
    } else {
      senderUserDetails = senderUserDetails[0];
      receiverUserDetails = receiverUserDetails[0];
    }
    if (senderUserDetails.user_type != 1)
      if (senderUserDetails.balance < reqBody.amount)
        throw { message: "Insuffcient Fund!!!" };

    let responseBody = await controller.addMoney(
      reqBody,
      senderUserDetails,
      receiverUserDetails,
      getUsersTableDetails,
      getFundsTableDetails,
      senderUserFilter,
      receiverUserFilter
    );
    return res
      .status(200)
      .json(
        responseHandler(responseBody, "Data has been getting successfully!!!")
      );
  } catch (error) {
    let { httpCode, responseBody } = error;
    if (httpCode) {
      return res.status(httpCode).json(responseBody);
    }
    return res.status(400).json(responseHandler("", error.message));
  }
});

router.post("/receiveMoney", async (req, res) => {
  try {
    let reqBody = req.body;
    let tableName = "USERS";

    let getTableDetails = commonFunctions.getTableDetails(tableName);
    let responseBody = await controller.receiveMoney(
      reqBody.reqBody,
      getTableDetails
    );
    return res
      .status(200)
      .json(
        responseHandler(responseBody, "Data has been getting successfully!!!")
      );
  } catch (error) {
    let { httpCode, responseBody } = error;
    if (httpCode) {
      return res.status(httpCode).json(responseBody);
    }
    return res.status(400).json(responseHandler("", error.message));
  }
});

router.post("/getTransaction", async (req, res) => {
  try {
    const query = constants.RAWQUERIES["GETTRANSACTIONS"];

    let reqBody = req.body;

    if (!query) throw { message: "Something Went Wrong" };

    let responseBody = await commonController.filtersByRaw(
      reqBody.reqBody,
      query
    );
    return res
      .status(200)
      .json(
        responseHandler(responseBody, "Data has been getting successfully!!!")
      );
  } catch (error) {
    let { httpCode, responseBody } = error;
    if (httpCode) {
      return res.status(httpCode).json(responseBody);
    }
    return res.status(400).json(responseHandler("", error.message));
  }
});

module.exports = router;
