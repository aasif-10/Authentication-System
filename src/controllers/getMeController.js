const userModel = require("../models/user-model");

module.exports.getMeController = async (req, res) => {
  const userId = req.userId;
  const user = await userModel.findOne({ _id: userId });

  if (!user) {
    return res.status(409).json({
      message: "user not found",
      status: false,
    });
  }

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
    },
  });
};
