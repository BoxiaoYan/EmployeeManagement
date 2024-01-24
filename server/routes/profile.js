const express = require("express");
const profileRouter = express.Router();
const { saveProfile, getProfileSummary } = require("../handlers/profile")

profileRouter.post("/save_profile", saveProfile);
profileRouter.get("/profile_summary", getProfileSummary);

module.exports = profileRouter;