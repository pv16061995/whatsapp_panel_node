const commonFunctions = require("../utils/commonFunctions");
const Sequelize = require("sequelize");
const db = require("../config/mysql");
const { parseConditionMysql } = require("../utils/commonFunctions");

exports.saveData = async (obj, getTableDetails) => {
  let models = commonFunctions.getSchema(getTableDetails);

  if (Array.isArray(obj)) {
    return await models.bulkCreate(obj, { validate: true });
  } else {
    const data = new models(obj);
    return await data.save();
  }
};

exports.aggregate = async (obj, getTableDetails) => {
  let models = commonFunctions.getSchema(getTableDetails);
  return await models.aggregate([obj]);
};

exports.removeData = async (obj, getTableDetails) => {
  let models = commonFunctions.getSchema(getTableDetails);
  console.log("obj>>", obj);
  return await models.destroy(obj);
};

exports.updateData = async (reqBody, getTableDetails, filter) => {
  const filterBody = parseConditionMysql(filter);
  let models = commonFunctions.getSchema(getTableDetails);
  await models.update(reqBody, filterBody);
  console.log("reqBody>>", reqBody);
  return await models.findAll({ where: reqBody });
  // return await models.findAll(filterBody);
};

exports.filters = async (filter, getTableDetails) => {
  let models = commonFunctions.getSchema(getTableDetails);
  console.log("reqBody>>", filter);
  return await models.findAll({ where: filter });
};

exports.rawQuery = async (query, params) => {
  const data = await db.query(query, {
    replacements: params,
    type: Sequelize.QueryTypes.SELECT,
  });

  return data;
};
