const Sequelize = require("sequelize");
const db = new Sequelize("ecom", "root", "", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: false,
});
module.exports = db;
