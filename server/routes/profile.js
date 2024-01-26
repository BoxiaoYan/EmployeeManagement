const express = require("express");
const router = express.Router();
const { saveProfile, getOneProfile, getProfileSummary } = require("../handlers/profile")
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/save_profile", upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'pdfs', maxCount: 3 }
  ]), saveProfile);
router.get("/profile_summary", getProfileSummary);
router.get("/profile/:userID", getOneProfile);

module.exports = router;