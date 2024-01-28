const express = require("express");
const multer = require("multer");
const router = express.Router();
const { loginAuth, employeeAuth } = require("../authentication/auth")
const { getFile, saveFile, getUserVisaStatus } = require("../handlers/file");

const storage = multer.memoryStorage(); // Store the file in memory as a buffer
const upload = multer({ storage: storage });

router.post("/save_file", employeeAuth, upload.single("file"), saveFile);
router.get("/get_file/:fileName/:userID", loginAuth, getFile);
router.get("/user_visa_status/:userID", loginAuth, getUserVisaStatus);

module.exports = router;
