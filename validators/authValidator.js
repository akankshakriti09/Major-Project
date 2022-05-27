const { validationResult, body } = require("express-validator");
const db = require("../models");

const signupValidator = () => {
  return [
    body("firstname").trim().notEmpty().withMessage("First Name is required"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("User")
      .custom(async (username) => {
        const existingUser = await db.student.findOne({
          where: { username: username },
        });
        if (existingUser) {
          throw new Error("Username already in use");
        }
      }),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is invalid!")
      .custom(async (email) => {
        const existingUser = await db.student.findOne({
          where: { email: email },
        });
        if (existingUser) {
          throw new Error("Email already exist!");
        }
      }),
    body("regId")
      .trim()
      .notEmpty()
      .withMessage("registration Id is required")
      .isNumeric()
      .withMessage("registration should be numeric")
      .isLength({ min: 8, max: 8 })
      .withMessage("registration Id is invalid!")
      .custom(async (regId) => {
        const existingUser = await db.student.findOne({
          where: { regId: regId },
        });
        if (existingUser) {
          throw new Error("registration Id already exist!");
        }
      }),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

const loginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email or username is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

const teacherSignupValidator = () => {
  return [
    body("firstname").trim().notEmpty().withMessage("First Name is required"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("User")
      .custom(async (username) => {
        const existingUser = await db.teacher.findOne({
          where: { username: username },
        });
        if (existingUser) {
          throw new Error("Username already in use");
        }
      }),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is invalid!")
      .custom(async (email) => {
        const existingUser = await db.teacher.findOne({
          where: { email: email },
        });
        if (existingUser) {
          throw new Error("Email already exist!");
        }
      }),
    body("empId")
      .trim()
      .notEmpty()
      .withMessage("registration Id is required")
      .isNumeric()
      .withMessage("registration should be numeric")
      .isLength({ min: 8, max: 8 })
      .withMessage("registration Id is invalid!")
      .custom(async (empId) => {
        const existingUser = await db.teacher.findOne({
          where: { empId: empId },
        });
        if (existingUser) {
          throw new Error("registration Id already exist!");
        }
      }),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

const teacherLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email or username is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => {
    extractedErrors.push({ [err.param]: err.msg });
  });
  return res.status(200).json({
    status: false,
    message: extractedErrors,
  });
};

module.exports = {
  validate,
  signupValidator,
  loginValidator,
  teacherLoginValidator,
  teacherSignupValidator
};
