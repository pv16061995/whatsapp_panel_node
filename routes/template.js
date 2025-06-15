const express = require("express");
const axios = require("axios");
const controller = require("../controllers/common");
const router = express.Router();
const responseHandler = require("../lib/responseHandler");
const commonFunctions = require("../utils/commonFunctions");
const constants = require("../utils/constants");
const dao = require("../dao/common");

router.post("/sendforapproval", async (req, res) => {
  try {
    // console.log("reqBody>>", req)
    let reqBody = req.body;
    let tableName = "TEMPLATES";

    let getTableDetails = commonFunctions.getTableDetails(tableName);
    // let responseBody = await controller.filters(body, getTableDetails);
    const query = constants.RAWQUERIES["GETTEMPLATEDETAILS"];

    let responseBody = await controller.filtersByRaw(reqBody.reqBody, query);
    responseBody = responseBody[0];

    const WA_URL = `${process.env.WA_API_URL}${process.env.WA_VERSION}/${process.env.WABA_ID}/message_templates`;

    const header = responseBody.header;
    const body = responseBody.body;
    const footer = responseBody.footer;
    const buttons = responseBody.buttons;

    const components = [
      JSON.parse(header),
      JSON.parse(body),
      JSON.parse(footer),
      JSON.parse(buttons),
    ];
    const filtered = components.filter((obj) => Object.keys(obj).length > 0);

    const formData = {
      name: responseBody.name,
      language: responseBody.code,
      category: responseBody.category_name,
      components: filtered,
    };

    const waRes = await axios.post(WA_URL, formData, {
      headers: {
        Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    // const waRes = {
    //   data: {
    //     id: "771987891818092",
    //     status: "PENDING",
    //     category: "MARKETING",
    //   },
    // };
    let tempId = "";
    if (waRes && waRes.data.id) {
      const filter = {
        field: "id",
        op: "IN",
        value: [reqBody.reqBody.id],
      };
      const updateBody = {
        waba_temp_id: waRes.data.id,
        approval_status: 1,
        waba_status: waRes.data.status,
      };
      tempId = waRes.data.id;
      await dao.updateData(updateBody, getTableDetails, filter);
    }

    return res
      .status(200)
      .json(responseHandler(waRes, "Data has been getting successfully!!!"));
  } catch (error) {
    let { httpCode, responseBody } = error;
    if (httpCode) {
      return res.status(httpCode).json(responseBody);
    }
    return res
      .status(400)
      .json(responseHandler(error.response.data, error.message));
  }
});

router.post("/getStatus", async (req, res) => {
  try {
    let reqBody = req.body;
    let tableName = "TEMPLATES";

    let getTableDetails = commonFunctions.getTableDetails(tableName);
    // let responseBody = await controller.filters(body, getTableDetails);
    const query = constants.RAWQUERIES["GETTEMPLATEDETAILS"];

    let responseBody = await controller.filtersByRaw(reqBody.reqBody, query);
    responseBody = responseBody[0];
    let templateName = responseBody["name"];

    const WA_URL = `${process.env.WA_API_URL}${process.env.WA_VERSION}/${process.env.WABA_ID}/message_templates?name=${templateName}`;

    const waRes = await axios.get(WA_URL, {
      headers: {
        Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    let tempId = "";
    if (waRes && waRes.data.data.length) {
      const data = waRes.data.data;

      data.forEach(async (element) => {
        let id = element.id;
        let waba_status = element.status;
        let status = 1;
        if (waba_status == "PENDING") {
          status = 1;
        } else if (waba_status == "APPROVED") {
          status = 3;
        } else if (waba_status == "REJECTED") {
          status = 2;
        } else if (waba_status == "DELETED") {
          status = 4;
        }
        const filter = {
          field: "waba_temp_id",
          op: "IN",
          value: [id],
        };
        const updateBody = {
          waba_status: status,
        };
        await dao.updateData(updateBody, getTableDetails, filter);
      });
    }

    return res
      .status(200)
      .json(responseHandler(waRes, "Data has been getting successfully!!!"));
  } catch (error) {
    let { httpCode, responseBody } = error;
    if (httpCode) {
      return res.status(httpCode).json(responseBody);
    }
    return res
      .status(400)
      .json(responseHandler(error.response.data, error.message));
  }
});

router.post("/sentSms", async (req, res) => {
  try {
    let reqBody = req.body;

    let getAddressTableDetails =
      commonFunctions.getTableDetails("USERCONTACTS");

    const query = constants.RAWQUERIES["GETTEMPLATEDETAILS"];

    let templatesDetails = await controller.filtersByRaw(
      { id: reqBody.reqBody.template_id },
      query
    );

    let languageCode = templatesDetails[0]["code"];
    let templateName = templatesDetails[0]["name"];

    const addressFilter = {
      field: "group_id",
      op: "IN",
      value: [reqBody.reqBody.contact_id],
    };

    let addressDetails = await controller.filters(
      addressFilter,
      getAddressTableDetails
    );

    const contactArr = addressDetails.map(
      (item) => `${item.country_code}${item.contact}`
    );
    // console.log(contactArr);

    // const results = await Promise.all(contactArr.map(sendWhatsAppMessage));
    const results = await Promise.all(
      contactArr.map((to) =>
        sendWhatsAppMessage(to, templateName, languageCode)
      )
    );

    return res
      .status(200)
      .json(responseHandler(results, "Data has been getting successfully!!!"));
  } catch (error) {
    let { httpCode, responseBody } = error;
    if (httpCode) {
      return res.status(httpCode).json(responseBody);
    }
    return res
      .status(400)
      .json(responseHandler(error.response.data, error.message));
  }
});

async function sendWhatsAppMessage(to, templateName, languageCode) {
  // const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;
  const WA_URL = `${process.env.WA_API_URL}${process.env.WA_VERSION}/${process.env.WA_PHONE}/messages`;

  const data = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode },
    },
  };

  try {
    const response = await axios.post(WA_URL, data, {
      headers: {
        Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return { to, message_id: response.data.messages[0].id, success: true };
  } catch (error) {
    return {
      to,
      success: false,
      error: error.response?.data?.error?.message || error.message,
    };
  }
}

module.exports = router;
