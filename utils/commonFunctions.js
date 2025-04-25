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
