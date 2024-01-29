// const express = require("express");
// const router = express.Router();
// const { signin, register, getRegEmail } = require("../handlers/auth");

// router.post("/signin", signin);
// router.post("/register", register);
// router.get("/registration/:token", getRegEmail);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { login, register, verifySession, getRegEmail } = require("../handlers/auth");

router.post("/login", login);
router.post("/verify_session", verifySession);
router.post("/register", register);
router.get("/registration/:token", getRegEmail);

module.exports = router;