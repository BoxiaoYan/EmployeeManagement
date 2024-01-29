const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getFile, saveFile } = require("../handlers/file");
const { loginAuth, employeeAuth } = require("../authentication/auth")

// Store the file in memory as a buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/save_file", employeeAuth, upload.single("file"), saveFile);
router.get("/get_file/:fileName/:userID", loginAuth, getFile);

module.exports = router;