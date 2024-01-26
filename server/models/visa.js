const mongoose = require("mongoose");

const userVisaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  opt_receipt: {
    data: Buffer,
    contentType: String,
    feedback: String,
    status: {
      type: String,
      enum: ["Unsubmitted", "Pending", "Approved", "Rejected"],
      default: "Unsubmitted",
    },
  },
  opt_ead: {
    data: Buffer,
    contentType: String,
    feedback: String,
    status: {
      type: String,
      enum: ["Unsubmitted", "Pending", "Approved", "Rejected"],
      default: "Unsubmitted",
    },
  },
  i983: {
    data: Buffer,
    contentType: String,
    feedback: String,
    status: {
      type: String,
      enum: ["Unsubmitted", "Pending", "Approved", "Rejected"],
      default: "Unsubmitted",
    },
  },
  i20: {
    data: Buffer,
    contentType: String,
    feedback: String,
    status: {
      type: String,
      enum: ["Unsubmitted", "Pending", "Approved", "Rejected"],
      default: "Unsubmitted",
    },
  },
});

const Visa = mongoose.model("Visa", userVisaSchema);

module.exports = Visa;
