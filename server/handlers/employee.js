// const db = require("../models");
// const jwt = require("jsonwebtoken");

// exports.getEmployeeByStatus = async (req, res, next) => {
//   try {
//     const employees = await db.User.find(
//       { appStatus: req.params?.status },
//       "_id email fullName"
//     );
//     res.status(200).json({ employees });
//   } catch (error) {
//     return next(error);
//   }
// };

// exports.getEmployeeByRegStatus = async (req, res, next) => {
//   try {
//     const employees = await db.User.find(
//       { position: { $ne: 'hr' } },
//       "email fullName regLink appStatus"
//     );
//     res.status(200).json({ employees });
//   } catch (error) {
//     return next(error);
//   }
// };

// exports.generateRegLink = async function (req, res, next) {
//   try {
//     const { rootLink, fullName, email } = req.body;
//     // Generate registration link
//     const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "3h",
//     });
//     const regLink = `${rootLink}/registration/${token}`;
//     // Check if current email exists
//     const existUser = await db.User.findOne({ email });
//     if (existUser) {
//       // Check if user already registered
//       if (existUser.appStatus !== "UnRegistered") {
//         return next({ status: 400, message: "User is already registered" });
//       }
//       // Update the registration link
//       existUser.regLink = regLink;
//       await existUser.save();
//       return res.status(200).json({ regLink });
//     } else {
//       // Create new user
//       await db.User.create({ email, regLink, fullName, username: email });
//       return res.status(200).json({ regLink });
//     }
//   } catch (error) {
//     return next(error);
//   }
// };

const db = require("../models");

exports.getUserVisaStatus = async (req, res, next) => {
  try {
    const userID = req.userID;

    // Check if employee is OPT visa
    const userProfile = await db.Profile.findOne({ user: userID });
    console.log(userProfile.employment.visa)
    if (userProfile.employment.visa !== "F1(CPT/OPT)") {
      return res.status(200).json({});
    }

    let userVisa = await db.Visa.findOne({ user: userID });
    if (!userVisa) {
      userVisa = await db.Visa.create({ user: userID });
    }

    const { opt_receipt, opt_ead, i983, i20 } = userVisa;

    const feedback =
      i20.feedback ||
      i983.feedback ||
      opt_ead.feedback ||
      opt_receipt.feedback ||
      "";

    const visaStatus = {
      opt_receipt: opt_receipt.status,
      opt_ead: opt_ead.status,
      i983: i983.status,
      i20: i20.status,
      feedback,
    };

    return res.status(200).json({ visaStatus });
  } catch (error) {
    return next();
  }
};