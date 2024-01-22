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
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      // generate token & log in
      const token = jwt.sign({ id, position }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).json({ id, username, position, appStatus, token });
    } else {
      return next({ status: 400, message: "Invalid Email / Password." });
    }
  } catch (error) {
    return next({ status: 400, message: "Invalid Email / Password." });
  }
};

exports.register = async function (req, res, next) {
  try {
    const user = await db.User.create(req.body);
    const { id, username, position, appStatus } = user;
    const token = jwt.sign({ id, position }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).json({ id, username, position, appStatus, token });
  } catch (error) {
    // user already exist
    if (error.code === 11000) {
      error.message = "User is already exists";
    }
    return next({ status: 400, message: "Invalid Email / Password." });
  }
};
