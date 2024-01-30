const db = require("../models");
const jwt = require("jsonwebtoken");

exports.getEmployeeByStatus = async (req, res, next) => {
  try {
    const employees = await db.User.find(
      { appStatus: req.params?.status },
      "_id email fullName"
    );
    res.status(200).json({ employees });
  } catch (error) {
    return next(error);
  }
};

exports.getEmployeeByRegStatus = async (req, res, next) => {
  try {
    const employees = await db.User.find(
      { position: { $ne: "hr" } },
      "email fullName regLink appStatus"
    );
    res.status(200).json({ employees });
  } catch (error) {
    return next(error);
  }
};

exports.generateRegLink = async function (req, res, next) {
  try {
    const { rootLink, fullName, email } = req.body;
    // Generate registration link
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
    const regLink = `${rootLink}/registration/${token}`;
    // Check if current email exists
    const existUser = await db.User.findOne({ email });
    if (existUser) {
      // Check if user already registered
      if (existUser.appStatus !== "UnRegistered") {
        return next({ status: 400, message: "User is already registered" });
      }
      // Update the registration link
      existUser.regLink = regLink;
      await existUser.save();
      return res.status(200).json({ regLink });
    } else {
      // Create new user
      await db.User.create({ email, regLink, fullName, username: email });
      return res.status(200).json({ regLink });
    }
  } catch (error) {
    return next(error);
  }
};

exports.setEmployeeStatus = async function (req, res, next) {
  try {
    const { employee_id, newStatus, reason } = req.body;
    const user = await db.User.findById(employee_id);
    const profile = await db.Profile.findOne({ user: employee_id });
    if (!user) {
      return next({ status: 400, message: "User not found" });
    }
    if (!profile) {
      return next({ status: 400, message: "Profile not found" });
    }

    user.appStatus = newStatus;
    await user.save();

    profile.appStatus = newStatus;
    profile.rejectReason = reason;
    await profile.save();

    res.status(200).json({ message: "User status updated" });
  } catch (error) {
    return next(error);
  }
}