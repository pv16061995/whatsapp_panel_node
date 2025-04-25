const commonFunctions = require("../utils/commonFunctions");

exports.saveData = async (obj, getTableDetails) => {
  let models = commonFunctions.getSchema(getTableDetails);
  const data = new models(obj);
  return await data.save();
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
  let models = commonFunctions.getSchema(getTableDetails);
  await models.update(reqBody, filter);
  console.log("reqBody>>", reqBody);
  return await models.findAll({ where: reqBody });
};

exports.filters = async (filter, getTableDetails) => {
  let models = commonFunctions.getSchema(getTableDetails);
  console.log("reqBody>>", filter);
  return await models.findAll({ where: filter });
};
