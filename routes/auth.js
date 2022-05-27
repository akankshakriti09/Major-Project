const express = require("express");
const router = express.Router();
const Controller = require("../controller/authController.js");
const db = require("../models");
const verifyAuth = require("../middleware/verifyAuth");
const {
  validate,
  signupValidator,
  loginValidator,
  teacherLoginValidator,
  teacherSignupValidator
} = require("../validators/authValidator");

router.post("/signup", signupValidator(), validate, Controller.create);
router.post("/login", loginValidator(), validate, Controller.login);

router.post("/teacher/create",verifyAuth, teacherSignupValidator(),validate,Controller.addTeacher);
router.post("/teacher/login",teacherLoginValidator(),Controller.teacherLogin)
module.exports = router;
