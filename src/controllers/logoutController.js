const sessionModel = require("../models/session-model");

module.exports.logoutController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token not found",
    });
  }

  const session = await sessionModel.findOne({
    refreshToken: refreshToken,
    revoke: false,
  });

  if (!session) {
    return res.status(400).json({
      message: "Session not found",
    });
  }

  session.revoke = true;

  await session.save();

  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Logged out successfully",
  });
};
