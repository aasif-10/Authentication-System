const config = require("../config/config");
const jwt = require("jsonwebtoken");
const sessionModel = require("../models/session-model");

module.exports.logoutAllController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token not found",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  const session = await sessionModel.updateMany(
    {
      user: decoded.id,
      revoke: false,
    },
    { revoke: true },
  );

  if (!session) {
    return res.status(400).json({
      message: "Session not found",
    });
  }

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "Logged out from all devices",
  });
};
