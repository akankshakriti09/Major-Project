const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({
      status: false,
      errors: [{ message: "Token Not Found" }],
    });
  }
  jwt.verify(authHeader, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      return res.status(401).json({
        status: false,
        errors: "Unauthorized!",
      });
    }
    // req = result;
    if (result.roleType == 0) {
      next();
    } else {
      return res.status(401).json({
        status: false,
        errors: "User don't have permission",
      });
    }
  });
};
