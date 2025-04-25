const express = require("express");
const controller = require("../controllers/common");
const router = express.Router();
const responseHandler = require("../lib/responseHandler");
const commonFunctions = require("../utils/commonFunctions");

const { signup, login } = require("../controllers/common");

router.post("/login", async (req, res) => {
  try {
    let reqBody = req.body;
    let tableName = "USERS";

    let getTableDetails = commonFunctions.getTableDetails(tableName);
    let responseBody = await controller.login(reqBody.reqBody, getTableDetails);
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

router.post("/save", async (req, res) => {
  try {
    let reqBody = req.body;
    let tableName = reqBody["tableName"].toUpperCase();

    if (
      Object.keys(reqBody).length == 0 ||
      !reqBody.tableName ||
      !reqBody.reqBody ||
      Object.keys(reqBody.reqBody).length == 0
    )
      throw { message: "Please send details in desired format!!!" };

    let getTableDetails = commonFunctions.getTableDetails(tableName);
    let responseBody = await controller.save(reqBody.reqBody, getTableDetails);
    return res
      .status(200)
      .json(
        responseHandler(responseBody, "Data has been storing successfully!!!")
      );
  } catch (error) {
    let { httpCode, responseBody } = error;
    if (httpCode) {
      return res.status(httpCode).json(responseBody);
    }
    return res.status(400).json(responseHandler("", error.message));
  }
});

router.post("/filter", async (req, res) => {
  try {
    // console.log("reqBody>>", req)
    let reqBody = req.body;
    let tableName = reqBody["tableName"].toUpperCase();
    let body = reqBody.reqBody ? reqBody.reqBody : {};

    // if (Object.keys(reqBody).length == 0 || !reqBody.tableName || !reqBody.reqBody || Object.keys(reqBody.reqBody).length == 0)
    //     throw { message: "Please send details in desired format!!!" };

    let getTableDetails = commonFunctions.getTableDetails(tableName);
    let responseBody = await controller.filters(body, getTableDetails);
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

router.post("/aggregate", async (req, res) => {
  try {
    let reqBody = req.body;
    let tableName = reqBody["tableName"].toUpperCase();

    if (
      Object.keys(reqBody).length == 0 ||
      !reqBody.tableName ||
      !reqBody.reqBody ||
      Object.keys(reqBody.reqBody).length == 0
    )
      throw { message: "Please send details in desired format!!!" };

    let getTableDetails = commonFunctions.getTableDetails(tableName);
    let responseBody = await controller.aggregate(
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

router.post("/update", async (req, res) => {
  try {
    let reqBody = req.body;

    if (
      Object.keys(reqBody).length == 0 ||
      !reqBody.tableName ||
      !reqBody.reqBody ||
      Object.keys(reqBody.reqBody).length == 0 ||
      !reqBody.filter ||
      Object.keys(reqBody.filter).length == 0
    )
      throw { message: "Please send details in desired format!!!" };

    let tableName = reqBody["tableName"].toUpperCase();
    let filter = reqBody["filter"];

    let getTableDetails = commonFunctions.getTableDetails(tableName);
    let responseBody = await controller.updateData(
      reqBody.reqBody,
      getTableDetails,
      filter
    );
    return res
      .status(200)
      .json(
        responseHandler(responseBody, "Data has been update successfully!!!")
      );
  } catch (error) {
    let { httpCode, responseBody } = error;
    if (httpCode) {
      return res.status(httpCode).json(responseBody);
    }
    return res.status(400).json(responseHandler("", error.message));
  }
});

router.post("/delete", async (req, res) => {
  try {
    let reqBody = req.body;
    let tableName = reqBody["tableName"].toUpperCase();

    if (
      Object.keys(reqBody).length == 0 ||
      !reqBody.tableName ||
      !reqBody.reqBody ||
      Object.keys(reqBody.reqBody).length == 0
    )
      throw { message: "Please send details in desired format!!!" };

    let getTableDetails = commonFunctions.getTableDetails(tableName);
    let responseBody = await controller.delete(
      reqBody.reqBody,
      getTableDetails
    );
    return res
      .status(200)
      .json(
        responseHandler(responseBody, "Data has been deleted successfully!!!")
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
