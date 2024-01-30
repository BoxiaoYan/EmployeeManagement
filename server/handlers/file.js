const db = require("../models");

exports.saveFile = async (req, res, next) => {
  try {
    const userID = req.userID;
    const fileBuffer = req.file.buffer;
    const { fileName, contentType } = req.body;

    // If file is a visa file, also upload for visa status management
    if (["opt_receipt", "opt_ead", "i983", "i20"].includes(fileName)) {
      let userVisa = await db.Visa.findOne({ user: userID });
      if (!userVisa) {
        userVisa = await db.Visa.create({ user: userID });
      }
      userVisa[fileName].data = fileBuffer;
      userVisa[fileName].contentType = contentType;
      userVisa[fileName].status = "Pending";
      await userVisa.save();
    }

    // Save the file to employee profile -> documents
    const userProfile = await db.Profile.findOne({ user: userID });
    if (!userProfile) {
      return next({ status: 404, message: "None existing profile" });
    }
    const documents = userProfile.documents;
    const targetFile = documents.find((file) => file.fileName === fileName);
    if (targetFile) {
      // File is already existed, update
      targetFile.data = fileBuffer;
      targetFile.contentType = contentType;
    } else {
      // Add the file to the document list
      documents.push({ fileName, data: fileBuffer, contentType });
    }
    await userProfile.save();

    res.status(200).json({ message: "File is saved" });
  } catch (error) {
    return next();
  }
};

exports.getFile = async (req, res, next) => {
  try {
    const verify = req.verify;
    const { fileName, userID } = req.params;

    // Verify if userID belongs to current user / user is hr
    if (verify.userID !== userID && verify.position !== "hr") {
      return next({ status: 401, message: "Authentication failed" });
    }

    // Find the file from employee profile documents
    const userVisa = await db.Visa.findOne({ user: userID });
    if (!userVisa) {
      return next({ status: 404, message: "Employee not found" });
    }
    // const userProfile = await db.Profile.findOne({ user: userID });
    // if (!userProfile) {
    //   return next({ status: 404, message: "Employee not found" });
    // }
    // const documents = userProfile.documents;
    // const targetFile = documents.find((file) => file.fileName === fileName);
    // if (!targetFile) {
    //   return next({ status: 404, message: "File not found" });
    // }

    // Retrieve the file data
    const fileData = userVisa[fileName].data;
    const contentType = userVisa[fileName].contentType;

    // Set the response headers
    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}.pdf`
    );

    res.status(200).send(fileData);
  } catch (error) {
    return next();
  }
};