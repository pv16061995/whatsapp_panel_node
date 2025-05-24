const express = require("express");
const router = express.Router();
const responseHandler = require("../lib/responseHandler");
const commonFunctions = require("../utils/commonFunctions");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const fs = require("fs");
const dao = require("../dao/common");
const { multerUpload } = require("../utils/commonFunctions");

router.post("/upload", multerUpload.single("file"), async (req, res) => {
  try {
    const getUserGroupsTableDetails =
      commonFunctions.getTableDetails("USERGROUPS");
    const getUserContactsTableDetails =
      commonFunctions.getTableDetails("USERCONTACTS");

    const { type, group_name, user_id } = req.body;
    const file = req.file;

    if (!type || !group_name) {
      return res
        .status(400)
        .json({ message: "type, group_name are required." });
    }

    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const ext = file.filename.split(".")[1];
    const contacts = [];

    const userGroups = { user_id, group_name };

    const userGroupDetails = await dao.saveData(
      userGroups,
      getUserGroupsTableDetails
    );

    if (ext === "csv") {
      // Handle CSV
      fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", (row) => {
          // console.log(row);
          contacts.push({
            user_id,
            group_id: userGroupDetails["id"],
            name: row.name,
            contact: row.phone,
            email: row.email,
            country_code: row.country_code,
          });
        })
        .on("end", async () => {
          await dao.saveData(contacts, getUserContactsTableDetails);
          const updateCount = {
            count: contacts.length,
            duplicate_count:
              commonFunctions.findDuplicateContacts(contacts).length,
          };
          const filter = {
            field: "id",
            op: "IN",
            value: [userGroupDetails["id"]],
          };
          await dao.updateData(updateCount, getUserGroupsTableDetails, filter);
          fs.unlinkSync(file.path);
          return res.status(200).end(
            responseHandler(
              {
                count: contacts.length,
              },
              "Address Book data has been Uploaded Successfully"
            )
          );
        });
    } else if (ext === "xlsx") {
      // Handle XLSX
      const workbook = XLSX.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      worksheet.forEach((row) => {
        contacts.push({
          user_id,
          group_id: userGroupDetails["id"],
          name: row.name,
          contact: row.phone,
          email: row.email,
          country_code: row.country_code,
        });
      });

      await dao.saveData(contacts, getUserContactsTableDetails);
      const updateCount = {
        count: contacts.length,
        duplicate_count: commonFunctions.findDuplicateContacts(contacts).length,
      };
      const filter = {
        field: "id",
        op: "IN",
        value: [userGroupDetails["id"]],
      };
      await dao.updateData(updateCount, getUserGroupsTableDetails, filter);

      fs.unlinkSync(file.path);
      return res.status(200).json(
        responseHandler(
          {
            count: contacts.length,
          },
          "Address Book data has been Uploaded Successfully"
        )
      );
    } else {
      fs.unlinkSync(file.path);
      return res
        .status(400)
        .json({ message: "Only CSV and XLSX formats are supported." });
    }
    return res
      .status(200)
      .json(responseHandler(file, "Data has been getting successfully!!!"));
  } catch (error) {
    let { httpCode, responseBody } = error;
    if (httpCode) {
      return res.status(httpCode).json(responseBody);
    }
    return res.status(400).json(responseHandler("", error.message));
  }
});

module.exports = router;
