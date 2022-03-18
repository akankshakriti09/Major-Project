const express = require("express");
const router = express.Router();
const Controller = require("../controller/user.model.controller.js");
const db = require("../models");
const { validate, signupValidator,loginValidator } = require("../validators/authValidator");

router.post("/signup", signupValidator(),validate, Controller.create);
router.post('/login',loginValidator(),validate,Controller.login)

module.exports = router;
