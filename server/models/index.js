const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI);

module.exports.User = require("./User");
module.exports.Profile = require("./profile");
