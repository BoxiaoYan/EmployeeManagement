const express = require("express");
const router = express.Router();
const {
  getEmployeeByStatus,
  getEmployeeByRegStatus,
  generateRegLink,
} = require("../handlers/user");

router.get("/employees_status", getEmployeeByStatus);
router.get("/employees_reg_status", getEmployeeByRegStatus);
router.post("/generate_registration_link", generateRegLink);

module.exports = router;
