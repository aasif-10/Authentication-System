const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const sessionModel = require("../models/session-model");

module.exports.loginController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const user = await userModel.findOne({ username, email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return res.status(400).json({
      message: "Incorrect email or password",
    });
  }

  // Tokens and response code goes here...

  const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  const session = await sessionModel.create({
    user: user._id,
    refreshToken: refreshToken,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    revoke: false,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "logged in successfully",
    user: {
      username,
      email,
    },
    accessToken,
  });
};
