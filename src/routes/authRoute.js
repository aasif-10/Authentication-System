const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/isLoggedIn");
const { registerController } = require("../controllers/registerController");
const { getMeController } = require("../controllers/getMeController");
const {
  refreshTokenController,
} = require("../controllers/refreshTokenController");
const { logoutController } = require("../controllers/logoutController");
const { logoutAllController } = require("../controllers/logoutAllController");
const { loginController } = require("../controllers/loginController");

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/get-me", isLoggedIn, getMeController);

router.get("/refresh-token", refreshTokenController);

router.get("/logout", logoutController);

router.get("/logout-all", logoutAllController);

module.exports = router;
