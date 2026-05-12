const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const config = require("../config/config");

module.exports.registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Invalid credentials",
      status: false,
    });
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User already exists with username or email",
      status: false,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await userModel.create({
    username: username,
    email: email,
    password: hash,
  });

  const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    user: {
      username: username,
      email: email,
    },
    message: "User registered successfully",
    status: true,
    token: accessToken,
  });
};
