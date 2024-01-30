// const express = require("express");
// const router = express.Router();
// const {
//   getEmployeeByStatus,
//   getEmployeeByRegStatus,
//   generateRegLink,
// } = require("../handlers/user");

// router.get("/employees_status/:status", getEmployeeByStatus);
// router.get("/employees_reg_status", getEmployeeByRegStatus);
// router.post("/generate_registration_link", generateRegLink);

// module.exports = router;


const express = require("express");
const router = express.Router();
const {
  getEmployeeByStatus,
  getEmployeeByRegStatus,
  generateRegLink,
  setEmployeeStatus,
  getEmployeeVisaStatus,
  reviewVisaFile
} = require("../handlers/hr");
const { hrAuth } = require("../authentication/auth");

router.get("/employees_status/:status", hrAuth, getEmployeeByStatus);
router.get("/employees_reg_status", hrAuth, getEmployeeByRegStatus);
router.post("/generate_registration_link", hrAuth, generateRegLink);
router.post("/set_employee_status", hrAuth, setEmployeeStatus);
router.get("/employees_visa_status", hrAuth, getEmployeeVisaStatus);
router.post("/review_visa_file", hrAuth, reviewVisaFile);

module.exports = router;