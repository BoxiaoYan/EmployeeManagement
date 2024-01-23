const express = require("express");
const router = express.Router();
const { signin, register, generateRegLink, getRegEmail } = require("../handlers/auth");

router.post("/signin", signin);
router.post("/register", register);
router.post("/generate_registration_link", generateRegLink);
router.get("/registration/:token", getRegEmail);

module.exports = router;
