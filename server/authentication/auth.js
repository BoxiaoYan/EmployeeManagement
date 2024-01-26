const jwt = require("jsonwebtoken");

exports.loginAuth = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Find user
    return next();
  } catch (error) {
    return next({ status: 401, message: "Authentication failed" });
  }
};

exports.hrAuth = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.position === "hr") {
      return next();
    } else {
      return next({ status: 401, message: "Authentication failed" });
    }
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
