const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  // User id
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // a. Name
  name: {
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    preferredName: { type: String },
  },

  // b. Profile picture
  picture: {
    data: { type: String },
    contentType: { type: String },
    fileName: { type: String },
  },

  // c. Email
  email: { type: String, unique: true },

  // d. SSN, date of birth, gender
  personalInfo: {
    ssn: { type: String },
    birthday: { type: Date },
    gender: { type: String },
  },

  // e. Address
  address: {
    street: { type: String },
    apt: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },

  // f. Contact info
  phone: {
    cellPhone: { type: String },
    workPhone: { type: String },
  },

  // g. Employment
  employment: {
    visa: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
  },

  // h. Reference
  reference: {
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String },
  },

  // i. Emergency contacts
  emergencyContacts: [
    {
      firstName: { type: String },
      lastName: { type: String },
      middleName: { type: String },
      phone: { type: String },
      email: { type: String },
      relationship: { type: String },
    },
  ],

  // j. Documents
  documents: [
    {
      fileName: { type: String },
      data: { type: String },
      contentType: { type: String },
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
