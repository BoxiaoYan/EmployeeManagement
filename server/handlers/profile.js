const db = require("../models");

exports.saveProfile = async function (req, res, next) {
  try {
    const userID = req.userID;
    const profile = req.body.profile;
    const userProfile = await db.Profile.findOne({ user: userID });
    if (userProfile) {
      // If user exists, update the existing profile
      userProfile.name = profile.name || userProfile.name;
      userProfile.personalInfo =
        profile.personalInfo || userProfile.personalInfo;
      userProfile.address = profile.address || userProfile.address;
      userProfile.phone = profile.phone || userProfile.phone;
      userProfile.employment = profile.employment || userProfile.employment;
      userProfile.reference = profile.reference || userProfile.reference;
      userProfile.emergencyContacts =
        profile.emergencyContacts || userProfile.emergencyContacts;
      await userProfile.save();
      // await db.Profile.updateOne({ user: userID }, profile);
      return res
        .status(200)
        .json({ message: "User profile is updated successfully" });
    } else {
      // If user does not exist, create a new profile
      profile.user = userID;
      const newUserProfile = new db.Profile(profile);
      await newUserProfile.save();
      // Update application status
      const user = await db.User.findById(userID);
      user.appStatus = "Pending";
      await user.save();
      return res
        .status(201)
        .json({ message: "User profile is saved successfully" });
    }
  } catch (error) {
    if (error.message.includes("Profile validation failed")) {
      return next({ status: 400, message: "Profile validation failed" });
    } else {
      return next(error);
    }
  }
};

exports.getOneProfile = async function (req, res, next) {
  try {
    const verify = req.verify;
    const userID = req.params?.userID;
    
    // Verify if userID belongs to current user / user is hr
    if (verify.userID !== userID && verify.position !== "hr") {
      return next({ status: 401, message: "Authentication failed" });
    }

    const userProfile = await db.Profile.findOne({ user: userID });
    if (userProfile) {
      return res.status(200).json({ profile: userProfile });
    } else {
      return res.status(404).json({ error: "User profile is not found" });
    }
  } catch (error) {
    return next(error);
  }
};

exports.getProfileSummary = async function (req, res, next) {
  try {
    const profiles = await db.Profile.find();

    // Extract profile summary
    const profileSummary = profiles.map((profile, index) => ({
      key: index,
      name: {
        id: profile.user,
        name: {
          firstName: profile.name.firstName,
          lastName: profile.name.lastName,
          preferredName: profile.name.preferredName,
        },
      },
      ssn: profile.personalInfo.ssn,
      visa: profile.employment.visa,
      cellPhone: profile.phone.cellPhone,
      email: profile.email,
    }));

    return res.status(200).json({ profileSummary });
  } catch (error) {
    return next(error);
  }
};
