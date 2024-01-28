const express = require("express");
const router = express.Router();
const { getUserVisaStatus } = require("../handlers/employee");
const { employeeAuth } = require("../authentication/auth");

router.get("/visa_status", employeeAuth, getUserVisaStatus);

module.exports = router;
