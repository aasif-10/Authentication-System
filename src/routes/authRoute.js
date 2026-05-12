const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/isLoggedIn");
const { registerController } = require("../controllers/registerController");
const { getMeController } = require("../controllers/getMeController");
const {
  refreshTokenController,
} = require("../controllers/refreshTokenController");

router.post("/register", registerController);

router.get("/get-me", isLoggedIn, getMeController);

router.get("/refresh-token", refreshTokenController);

module.exports = router;
