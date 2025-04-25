const cors = require("cors");
const path = require("path");
// require('dotenv').config({ path: '.env' });
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const bodyParser = require("body-parser");
const dbType = process.env.DB_TYPE || "MYSQL";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

console.log("DB_TYPE >>", dbType);
let db;

db = require("./config/mysql"); // No const here
db.authenticate().then(() => {
  console.log("connected");
});

const routes = require("./routes");

app.use("/", routes);

// db.sync();

app.listen(port || process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
module.exports = app;
