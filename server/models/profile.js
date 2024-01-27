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
  email: { type: String, unique: true},

  // d. SSN, date of birth, gender
  personalInfo: {
    ssn: { type: Number },
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
    cellPhone: { type: Number },
    workPhone: Number,
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
    middleName: String,
    phone: String,
    email: String,
    relationship: { type: String },
  },

  // i. Emergency contacts
  emergencyContacts: [
    {
      firstName: { type: String },
      lastName: { type: String  },
      middleName: String,
      phone: String,
      email: String,
      relationship: { type: String  },
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
