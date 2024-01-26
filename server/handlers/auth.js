const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
  try {
    // find the user
    const user = await db.User.findOne({
      username: req.body.username,
    });
    const { id, email, username, position, appStatus } = user;
    // verify password
    const isMatch = await user.comparePassWord(req.body.password);
    if (isMatch) {
      // generate token & log in
      const token = jwt.sign({ id, position }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      return res
        .status(200)
        .json({ id, email, username, position, appStatus, token });
    } else {
      return next({ status: 400, message: "Invalid Username / Password" });
    }
  } catch (error) {
    return next(error);
  }
};

exports.register = async function (req, res, next) {
  try {
    const { email, username, password } = req.body;
    const user = await db.User.findOne({ email });
    if (!user) {
      return next({ status: 400, message: "Email is not existed" });
    }
    // User is already registered
    if (user.appStatus !== "UnRegistered") {
      return next({ status: 400, message: "User is already registered" });
    }
    // Update username, password, and application status
    user.username = username;
    user.password = password;
    user.appStatus = "UnSubmitted";
    await user.save();
    // Generate login token
    // const { id, position, appStatus } = user;
    // const token = jwt.sign({ id, position }, process.env.JWT_SECRET_KEY, {
    //   expiresIn: "1d",
    // });
    return res.status(200).json({ message: "Successfully registered"});
  } catch (error) {
    // Username already exist
    if (error.code === 11000) {
      return next({ status: 400, message: "Username is already existed" });
    }
    return next(error);
  }
};

// <<<<<<< HEAD
// exports.generateRegLink = async function (req, res, next) {
//   try {
//     const { rootLink, email } = req.body;
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
//       await db.User.create({ email, regLink, username: email });
//       return res.status(200).json({ regLink });
//     }
//   } catch (error) {
//     return next(error);
//   }
// };

// =======
// >>>>>>> origin/Haopeng
exports.getRegEmail = async function (req, res, next) {
  try {
    // Verify token
    const decoded = await jwt.verify(
      req.params?.token,
      process.env.JWT_SECRET_KEY
    );
    const email = decoded.email;
    return res.status(200).json({ email });
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error.message.includes("Bad control")
    ) {
      return next({ status: 401, message: "Invalid token" });
    } else if (error instanceof jwt.TokenExpiredError) {
      return next({ status: 401, message: "Token expired" });
    } else {
      return next(error);
    }
  }
};
