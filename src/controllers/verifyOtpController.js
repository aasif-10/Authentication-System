const userModel = require("../models/user-model");
const otpSchema = require("../models/otp-model");

module.exports.verifyOtpController = async (req, res) => {
  const { otp, email } = req.body;

  if (!otp) {
    return res.status(400).json({
      message: "OTP is required",
    });
  }

  const otpEntry = await otpSchema.findOne({ email, otp });

  if (!otpEntry) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  const user = await userModel.findByIdAndUpdate(otpEntry.user, {
    verified: true,
  });

  await otpSchema.deleteMany({ user: otpEntry.user });

  res.status(200).json({
    message: "OTP verified successfully",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
};
