const dao = require("../dao/common");
const { FILTERS } = require("../utils/constants");
const jwt = require("jsonwebtoken");
const {
  parseCondition,
  parseConditionMysql,
  parseConditionMysqlFilter,
} = require("../utils/commonFunctions");
require("dotenv").config();

exports.save = async (reqBody, getTableDetails) => {
  return await dao.saveData(reqBody, getTableDetails);
};

exports.aggregate = async (reqBody, getTableDetails) => {
  let filterKey = Object.keys(reqBody)[0];
  let filterKeyUpper = filterKey.toUpperCase();

  if (!FILTERS[filterKeyUpper]) {
    throw new NotFoundException("Please send valid parameters!!!");
  }
  let key = FILTERS[filterKeyUpper];
  let filterObject = { $match: {} };
  filterObject["$match"][key] = [];

  console.log("reqBody>>>", filterObject);
  let filterObjectKey = filterObject["$match"][key];
  let i = 0;
  reqBody[filterKey].forEach((element) => {
    let field = element["field"];
    let op = element["op"].toUpperCase();
    let opAct = FILTERS[op];
    let value = element["value"];
    filterObjectKey[i] = {};
    filterObjectKey[i][field] = {};
    filterObjectKey[i][field][opAct] = value;

    //   let par = parseCondition(element);
    //   filterObjectKey[i] = par;
    // console.log("element>>>",element);
    i++;
  });

  return await dao.aggregate(filterObject, getTableDetails);
};

exports.delete = async (reqBody, getTableDetails) => {
  const filter = parseConditionMysql(reqBody);
  return await dao.removeData(filter, getTableDetails);
};

exports.updateData = async (reqBody, getTableDetails, filter) => {
  // const filterBody = parseConditionMysql(filter);
  // console.log("filterBody >>>", filterBody);
  return await dao.updateData(reqBody, getTableDetails, filter);
};

exports.filters = async (filter, getTableDetails) => {
  const filterBody = parseConditionMysqlFilter(filter);

  return await dao.filters(filterBody, getTableDetails);
};

exports.login = async (filter, getTableDetails) => {
  let user = await dao.filters(filter, getTableDetails);

  if (user.length > 0) {
    user = user[0];
    const payload = {
      id: user.id,
      email: user.email,
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    user["dataValues"]["token"] = token;
  }
  return user;
};

exports.filtersByRaw = async (filter, query) => {
  return await dao.rawQuery(query, filter);
};
