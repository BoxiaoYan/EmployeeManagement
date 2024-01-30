const express = require("express");
const router = express.Router();
const {
  getEmployeeByStatus,
  reviewVisaFile,
  getEmployeeByRegStatus,
  getEmployeeVisaStatus,
  setEmployeeStatus,
  generateRegLink,
} = require("../handlers/hr");
const { hrAuth } = require("../authentication/auth");

router.get("/employees_status/:status", hrAuth, getEmployeeByStatus);
router.get("/employees_reg_status", hrAuth, getEmployeeByRegStatus);
router.get("/employees_visa_status", hrAuth, getEmployeeVisaStatus);
router.post("/set_employee_status", hrAuth, setEmployeeStatus);
router.post("/generate_registration_link", hrAuth, generateRegLink);
router.post("/review_visa_file", hrAuth, reviewVisaFile);

module.exports = router;
