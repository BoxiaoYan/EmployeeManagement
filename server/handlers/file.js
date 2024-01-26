const db = require("../models");

exports.saveFile = async (req, res, next) => {
  try {
    const fileBuffer = req.file.buffer;
    const { filename, contentType, userID } = req.body;
    const userVisa = await db.Visa.findOne({ user: userID });

    if (userVisa) {
      // Existing user
      userVisa[filename].data = fileBuffer;
      userVisa[filename].contentType = contentType;
      userVisa[filename].status = "Pending";
      await userVisa.save();
    } else {
      // New user
      const newUserVisa = await db.Visa.create({ user: userID });
      newUserVisa[filename].data = fileBuffer;
      newUserVisa[filename].contentType = contentType;
      newUserVisa[filename].status = "Pending";
      await newUserVisa.save();
    }
    res.json({ message: "File is saved" });
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
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    // Send the file data as the response
    res.send(fileData);
  } catch (error) {
    return next();
  }
};
