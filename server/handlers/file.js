const db = require("../models");

exports.saveFile = async (req, res, next) => {
  try {
    const fileBuffer = req.file.buffer;
    const { fileName, contentType, userID } = req.body;
    let userVisa = await db.Visa.findOne({ user: userID });

    if (!userVisa) {
      userVisa = await db.Visa.create({ user: userID });
    }

    userVisa[fileName].data = fileBuffer;
    userVisa[fileName].contentType = contentType;
    userVisa[fileName].status = "Pending";
    await userVisa.save();
    res.status(200).json({ message: "File is saved" });
  } catch (error) {
    console.log(error);
    return next();
  }
};

exports.getFile = async (req, res, next) => {
  try {
    const { fileName, userID } = req.params;

    // Find the user's visa information
    const userVisa = await db.Visa.findOne({ user: userID });

    if (!userVisa) {
      return next({ status: 404, message: "File not found" });
    }

    // Retrieve the file data
    const fileData = userVisa[fileName].data;
    const contentType = userVisa[fileName].contentType;

    // Set the response headers
    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}.pdf`
    );

    // Send the file data as the response
    res.status(200).send(fileData);
  } catch (error) {
    return next();
  }
};

exports.getUserVisaStatus = async (req, res, next) => {
  try {
    const { userID } = req.params;
    // Check if user is OPT
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
