const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },

    ip: {
      type: String,
      required: true,
    },

    userAgent: {
      type: String,
      required: true,
    },

    revoke: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("session", sessionSchema);
