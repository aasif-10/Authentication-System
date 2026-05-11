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

  let user;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, genSalt, async function (err, hash) {
      user = await userModel.create({
        username: username,
        email: email,
        password: hash,
      });
    });
  });

  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(201).json({
    user: {
      username: username,
      email: email,
    },
    message: "User registered successfully",
    status: true,
  });
};
