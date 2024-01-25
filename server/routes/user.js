const express = require("express");
const router = express.Router();
const { saveProfile, getOneProfile, getProfileSummary } = require("../handlers/profile")

router.post("/save_profile", saveProfile);
router.get("/profile_summary", getProfileSummary);
router.get("/profile/:userID", getOneProfile);

module.exports = router;