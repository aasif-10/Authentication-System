require("dotenv").config();
if (!process.env.PORT) {
  throw new Error("PORT variable missing in environment variable");
}

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI variable missing in environment variable");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET variable missing in environment variable");
}

const config = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;
