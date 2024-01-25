const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
  try {
    // find the user
    const user = await db.User.findOne({
      username: req.body.username,
    });
    const { id, username, position, appStatus } = user;
    // verify password
    const isMatch = await user.comparePassWord(req.body.password);
    if (isMatch) {
      // generate token & log in
      const token = jwt.sign({ id, position }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).json({ id, username, position, appStatus, token });
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
    const { id, position, appStatus } = user;
    const token = jwt.sign({ id, position }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).json({ id, username, position, appStatus, token });
  } catch (error) {
    // Username already exist
    if (error.code === 11000) {
      return next({ status: 400, message: "Username is already existed" });
    }
    return next(error);
  }
};

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
    if (error instanceof jwt.JsonWebTokenError) {
      return next({ status: 401, message: "Invalid token" });
    } else if (error instanceof jwt.TokenExpiredError) {
      return next({ status: 401, message: "Token Expired" });
    } else {
      return next(error);
    }
  }
};
