const multer = require("multer");
const { collectionData } = require("./constants");

exports.getTableDetails = (tableName) => {
  if (tableName && collectionData[tableName]) {
    return collectionData[tableName];
  } else {
    throw { message: "Please send valid table name" };
  }
};

exports.parseCondition = (condition) => {
  let { field, op, value } = condition;
  op = op.toUpperCase();
  switch (op) {
    case "=":
      return { [field]: value };
    case "!=":
      return { [field]: { $ne: value } };
    case ">":
      return { [field]: { $gt: value } };
    case "<":
      return { [field]: { $lt: value } };
    case ">=":
      return { [field]: { $gte: value } };
    case "<=":
      return { [field]: { $lte: value } };
    case "IN":
      return { [field]: { $in: value } };
    case "NIN":
      return { [field]: { $nin: value } };
    default:
      throw new Error(`Unsupported operator: ${op}`);
  }
};

exports.parseConditionMysqlFilter = (condition) => {
  var Sequelize = require("sequelize");
  const Op = Sequelize.Op;
  let { field, op, value } = condition;
  op = op.toUpperCase();
  switch (op) {
    case "=":
      return { [field]: value };
    case "!=":
      return { [field]: { [Op.nin]: value } };
    case ">":
      return { [field]: { [Op.gt]: value } };
    case "<":
      return { [field]: { [Op.lt]: value } };
    case ">=":
      return { [field]: { [Op.gte]: value } };
    case "<=":
      return { [field]: { [Op.lte]: value } };
    case "IN":
      return { [field]: { [Op.in]: value } };
    case "NIN":
      return { [field]: { [Op.nin]: value } };
    default:
      throw new Error(`Unsupported operator: ${op}`);
  }
};
exports.parseConditionMysql = (condition) => {
  let { field, op, value } = condition;
  // op = op.toUpperCase()
  return { where: { [field]: value } };
};

exports.getSchema = (getTableDetails) => {
  let { schema, tableName } = getTableDetails;
  const db = require("../config/mysql");
  const Sequelize = require("sequelize");

  return db.define(tableName, schema, {
    timestamps: false,
    tableName,
    freezeTableName: true,
  });
};

exports.findDuplicateContacts = (contacts) => {
  const seen = new Set();
  const duplicates = [];

  for (const contact of contacts) {
    const key = `${contact.phone}-${contact.email}`; // combine fields to make unique key
    if (seen.has(key)) {
      duplicates.push(contact);
    } else {
      seen.add(key);
    }
  }

  return duplicates;
};

const multerStrorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let exArr = file.originalname.split(".");
    let extension = exArr[exArr.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});

exports.multerUpload = multer({ storage: multerStrorage });
