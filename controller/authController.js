const db = require("../models/index");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.create = async (req, res) => {
  try {
    const { regId, firstname, lastname, email, username, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 12);
    await db.student.create({
      regId: regId,
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: hashpassword,
    });
    return res.status(201).json({
      status: true,
      message: "Registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      errors: [{ message: "Something went wrong!" }],
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.student.findOne({
      where: { [Op.or]: [{ username: email }, { email: email }] },
    });
    if (user) {
      const passMatched = await bcrypt.compare(password, user.password);
      if (passMatched) {
        const token = jwt.sign(
          {
            id: user.id,
            regId: user.regId,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        const userData = {
          id: user.id,
          regId: user.regId,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
          token
        }
        return res.status(200).json({
          status: true,
          message: "Login successfully",
          data: userData
        });
      }
    } else {
      return res.status(401).json({
        status: false,
        errors: [{ message: "Invalid Credentials!" }],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: false,
      errors: [{ message: "Your account has been deleted!" }],
    });
  }
};
