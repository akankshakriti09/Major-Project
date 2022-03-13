const express = require("express");
const router = express.Router();

const db = require("../models");
const { responseHelper } = require("../helpers/response.helper.js");

router.post("/dummy-data", (req, res) => {
  try {
    db.student.bulkCreate([
      {
        regId: 3820001,
        firstname: "Student",
        lastname: "Kumar",
        email: "student1@gmail.com",
        username: "student_kumar12211",
        password: "Pass@1234",
      },
      {
        regId: 3820002,
        firstname: "Student",
        lastname: "Kumar",
        email: "student2@gmail.com",
        username: "student_kumar12212",
        password: "Pass@1234",
      },
      {
        regId: 3820003,
        firstname: "Student",
        lastname: "Kumar",
        email: "student3@gmail.com",
        username: "student_kumar12213",
        password: "Pass@1234",
      },
    ]);
    responseHelper(
      res,
      true,
      "Dummy data added",
      200,
      "Dummy Data added successfully"
    );
  } catch (err) {
    responseHelper(
      res,
      false,
      "Fail to create",
      200,
      "Dummy Data fail to create"
    );
  }
});

module.exports = router;
