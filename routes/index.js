var express = require("express");
var path = require("path");
var router = express.Router();
const common = require("./common");
const wallet = require("./wallet");
const addressBook = require("./addressBook");
const media = require("./media");
const template = require("./template");

const CONST_URL = "/api/v1/";
router.use(CONST_URL + "uploads", express.static(path.join("./uploads")));

router.use(CONST_URL + "common", common);
router.use(CONST_URL + "wallet", wallet);
router.use(CONST_URL + "addressBook", addressBook);
router.use(CONST_URL + "media", media);
router.use(CONST_URL + "template", template);

module.exports = router;
