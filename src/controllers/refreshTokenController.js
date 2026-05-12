const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports.refreshTokenController = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({
      message: "refresh token not found",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  const accessToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const newRefreshToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "Access token refreshed sucessfully",
    token: accessToken,
  });
};
