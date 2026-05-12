const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "User not logged in",
      status: "false",
    });
  }

  const decode = jwt.verify(token, config.JWT_SECRET);

  req.userId = decode.id;
  next();
};
