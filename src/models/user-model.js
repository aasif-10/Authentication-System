const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: [true, "username must be unique"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
      index: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("user", userSchema);
