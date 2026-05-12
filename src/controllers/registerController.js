const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const config = require("../config/config");
const sessionModel = require("../models/session-model");
const { generateOtp, getOtpHtml } = require("../utils/utils");
const { sendEmail } = require("../services/email-service");
const { otpModel } = require("../models/otp-model");

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

  const otp = generateOtp();
  const otpHtml = getOtpHtml(otp);

  const otpEntry = await otpModel.create({
    email: email,
    user: user._id,
    otp: otp,
  });

  await sendEmail(email, "Your OTP Code", `Your OTP code is: ${otp}`, otpHtml);

  res.status(201).json({
    user: {
      username: username,
      email: email,
    },
    message: "User registered successfully",
    status: true,
  });
};
