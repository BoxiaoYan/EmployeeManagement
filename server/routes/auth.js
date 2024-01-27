const express = require("express");
const router = express.Router();
const { login, register, verifySession, getRegEmail } = require("../handlers/auth");

router.post("/login", login);
router.post("/verify_session", verifySession);
router.post("/register", register);
router.get("/registration/:token", getRegEmail);

module.exports = router;
