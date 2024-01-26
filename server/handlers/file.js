const db = require("../models");

exports.saveFile = async (req, res, next) => {
  try {
    const fileBuffer = req.file.buffer;
    const { filename, contentType, userID } = req.body;
    let userVisa = await db.Visa.findOne({ user: userID });

    if (!userVisa) {
      userVisa = await db.Visa.create({ user: userID });
    }

    userVisa[filename].data = fileBuffer;
    userVisa[filename].contentType = contentType;
    userVisa[filename].status = "Pending";
    await userVisa.save();
    res.status(200).json({ message: "File is saved" });
  } catch (error) {
    console.log(error);
    return next();
  }
};

exports.getFile = async (req, res, next) => {
  try {
    const { filename, userID } = req.params;

    // Find the user's visa information
    const userVisa = await db.Visa.findOne({ user: userID });

    if (!userVisa) {
      return next({ status: 404, message: "File not found" });
    }

    // Retrieve the file data
    const fileData = userVisa[filename].data;
    const contentType = userVisa[filename].contentType;

    // Set the response headers
    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${filename}.pdf`
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

    const visaStatus = {
      opt_receipt: userVisa.opt_receipt.status,
      opt_ead: userVisa.opt_ead.status,
      i983: userVisa.i983.status,
      i20: userVisa.i20.status,
    };
    return res.status(200).json({ visaStatus });
  } catch (error) {
    return next();
  }
};
