const { responseHelper } = require("../helpers/response.helper");
const { student } = require("../models");

exports.create = async (req, res) => {
  console.log(req.body);
  student.create(req.body).then((result) => {
    return responseHelper(
      res,
      true,
      result,
      200,
      "Student registered Successfully"
    );
  });
};
