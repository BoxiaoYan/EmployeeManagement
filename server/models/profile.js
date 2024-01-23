const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  // User id
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // i. Name
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: String,
  preferredName: String,

  // ii. Profile picture
  pictrue: { data: Buffer, contentType: String },

  // iii. Current address
  address: {
    street: { type: String, required: true },
    apt: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },

  // iv. Phone
  phone: { type: Number, required: true },
  workPhone: Number,

  // v. Email
  email: { type: String, unique: true, required: true },

  // vi. SSN, birthday, gender
  ssn: { type: Number, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },

  // vii.
  usCitizenship: {
    isCitizen: { type: Boolean, default: false },
    // discuss with frontend
  },

  // viii. Reference
  reference: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: String,
    phone: String,
    email: String,
    relationship: { type: String, required: true },
  },
  emergencyContacts: [
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: String,
      phone: String,
      email: String,
      relationship: { type: String, required: true },
    },
  ],

  // ix. Uploaded files
  files: [
    {
      type: String,
      data: Buffer,
      contentType: String,
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
