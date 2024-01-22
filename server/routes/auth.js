const express = require("express");
const router = express.Router();
const { signin, register } = require("../handlers/auth");

router.post("/signin", signin);
router.post("/register", register);

module.exports = router;
