const express = require("express");
const router = express.Router();
const { saveProfile, getProfileSummary } = require("../handlers/profile")

router.post("/save_profile", saveProfile);
router.get("/profile_summary", getProfileSummary);

module.exports = router;