const db = require("../models");
const jwt = require("jsonwebtoken");

exports.login = async function (req, res, next) {
  try {
    // find the user
    const user = await db.User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return next({ status: 400, message: "Invalid Username / Password" });
    }
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

exports.verifySession = async function (req, res, next) {
  try {
    // If user session is avalible
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id, position } = decoded;
    const newToken = jwt.sign({ id, position }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).json({ token: newToken, position });
  } catch (error) {
    return res.status(200).json({});
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
    return res.status(200).json({ message: "Successfully registered" });
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
