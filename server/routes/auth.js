const express = require("express");
const router = express.Router();
const { signin, register, getRegEmail } = require("../handlers/auth");

router.post("/signin", signin);
router.post("/register", register);
router.get("/registration/:token", getRegEmail);

module.exports = router;
