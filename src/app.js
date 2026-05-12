const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const dbConn = require("./config/mongoose-connection");

/* routes */
const redirectRoute = require("./routes/redirectRoute");
const healthRoute = require("./routes/healthRoute");
const authRoute = require("./routes/authRoute");

/* models */
const userModel = require("./models/user-model");
const sessionModel = require("./models/session-model");

app.use("/", redirectRoute);
app.use("/api/health", healthRoute);
app.use("/api/auth", authRoute);

module.exports = app;
