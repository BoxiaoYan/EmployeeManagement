const express = require("express");
const authRouter = express.Router();
const { signin, register, generateRegLink, getRegEmail } = require("../handlers/auth");

authRouter.post("/signin", signin);
authRouter.post("/register", register);
authRouter.post("/generate_registration_link", generateRegLink);
authRouter.get("/registration/:token", getRegEmail);

module.exports = authRouter;
