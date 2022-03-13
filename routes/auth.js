const express = require("express");
const router = express.Router();
const Controller = require("../controller/user.model.controller.js");
const db = require("../models");
// const authJwt = require("../middleware/verifyAuth.js");

router.post("/signup", Controller.create);

module.exports = router;
