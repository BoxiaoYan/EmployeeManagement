const express = require("express");
const router = express.Router();
const { saveProfile, getOneProfile, getProfileSummary } = require("../handlers/profile")
const { loginAuth, hrAuth, employeeAuth } = require("../authentication/auth")

router.post("/save_profile", employeeAuth, saveProfile);
router.get("/profile_summary", hrAuth, getProfileSummary);
router.get("/profile/:userID", loginAuth, getOneProfile);

module.exports = router;