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
