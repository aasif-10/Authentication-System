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

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID variable missing in environment variable");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "GOOGLE_CLIENT_SECRET variable missing in environment variable",
  );
}

if (!process.env.GOOGLE_REFRESH_TOKEN) {
  throw new Error(
    "GOOGLE_REFRESH_TOKEN variable missing in environment variable",
  );
}

if (!process.env.GOOGLE_FROM_EMAIL) {
  throw new Error("GOOGLE_FROM_EMAIL variable missing in environment variable");
}

const config = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  GOOGLE_FROM_EMAIL: process.env.GOOGLE_FROM_EMAIL,
};

module.exports = config;
