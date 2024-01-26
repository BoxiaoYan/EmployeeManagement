const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  // User id
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // a. Name
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: String,
    preferredName: String,
  },

  // b. Profile picture
  picture: { 
    data: Buffer,
    contentType: String,
    filename: String
  },

  // c. Email
  email: { type: String, unique: true, required: true },

  // d. SSN, date of birth, gender
  personalInfo: {
    ssn: { type: Number, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
  },

  // e. Address
  address: {
    street: { type: String, required: true },
    apt: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },

  // f. Contact info
  phone: {
    cellPhone: { type: Number, required: true },
    workPhone: Number,
  },

  // g. Employment
  employment: {
    visa: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },

  // h. Reference
  reference: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: String,
    phone: String,
    email: String,
    relationship: { type: String, required: true },
  },

  // i. Emergency contacts
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

  // j. Documents
  documents: [
    {
      data: Buffer,
      contentType: String,
      filename: String
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
