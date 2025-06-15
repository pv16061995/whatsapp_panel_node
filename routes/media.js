const express = require("express");
const path = require("path");
const router = express.Router();
const responseHandler = require("../lib/responseHandler");
const commonFunctions = require("../utils/commonFunctions");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const fs = require("fs");
const dao = require("../dao/common");
const { multerUpload } = require("../utils/commonFunctions");
const axios = require("axios");
const FormData = require("form-data");

router.post("/upload", multerUpload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const reqBody = req.body;
    console.log("file>>", file);
    if (!file) throw new Error("No file received");

    const getMediaTableDetails =
      commonFunctions.getTableDetails("MEDIA_UPLOAD");

    const mediaUploadData = {
      user_id: parseInt(reqBody.user_id),
      mimetype: file.mimetype,
      size: file.size,
      file_name: file.filename,
    };

    const mediaDetails = await dao.saveData(
      mediaUploadData,
      getMediaTableDetails
    );

    const formData = new FormData();
    const dirName = __dirname.replace("routes", "");
    const filePath = path.join(dirName, file.path);
    formData.append("file", fs.createReadStream(filePath));
    formData.append("type", file.mimetype); // required!
    formData.append("messaging_product", "whatsapp"); // required!
    console.log("formData>>", filePath);
    const WA_URL = `${process.env.WA_API_URL}${process.env.WA_VERSION}/${process.env.WA_PHONE}/media`;

    const waRes = await axios.post(WA_URL, formData, {
      headers: {
        Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
        ...formData.getHeaders(),
      },
    });

    const mediaId = waRes.data.id;

    if (mediaId && mediaDetails.id) {
      const filter = {
        field: "id",
        op: "IN",
        value: [mediaDetails["id"]],
      };
      const updateData = {
        upload_status: 1,
        mediaId,
      };
      await dao.updateData(updateData, getMediaTableDetails, filter);
    }
    fs.unlinkSync(file.path);
    return res
      .status(200)
      .json(responseHandler({ mediaId }, "Upload successful"));
  } catch (error) {
    console.error(
      "WhatsApp Upload Error:",
      error.response?.data || error.message
    );
    return res
      .status(400)
      .json(responseHandler("", error.response?.data || error.message));
  }
});

module.exports = router;
