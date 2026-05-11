const mongoose = require("mongoose");
const config = require("./config");
mongoose
  .connect(`${config.MONGODB_URI}`)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(() => {
    console.log("Error connecting database");
  });
