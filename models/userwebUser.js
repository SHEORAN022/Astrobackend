// const mongoose = require("mongoose");

// const userwebSchema = new mongoose.Schema({
//   name: { type: String, default: "" },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, default: "" },
//   password: { type: String, default: "" }, // optional if using OTP
//   profileImage: { type: String, default: "" },

//   gender: { type: String, default: "" },
//   dob: { type: String, default: "" },
//   timeOfBirth: { type: String, default: "" },
//   placeOfBirth: { type: String, default: "" },
//   location: { type: String, default: "" },

//   // OTP fields for email-based OTP login
//   otp: { type: String },
//   otpExpiry: { type: Date },

//   kundli: {
//     moonSign: String,
//     ascendant: String,
//     nakshatra: String,
//     dasha: String,
//     kundliStatus: { type: String, default: "Not Generated" },
//     savedReports: [{ type: String }],
//   },

//   orders: [
//     {
//       orderId: String,
//       serviceName: String,
//       amount: Number,
//       date: String,
//       status: String,
//       transactionId: String,
//     },
//   ],

//   remedies: [
//     {
//       title: String,
//       description: String,
//       status: String, // Active / Completed
//       startDate: String,
//       endDate: String,
//     },
//   ],

//   payments: [
//     {
//       paymentId: String,
//       amount: Number,
//       method: String,
//       status: String,
//       date: String,
//     },
//   ],

//   wallet: {
//     balance: { type: Number, default: 0 },
//     history: [
//       {
//         amount: Number,
//         type: String, // Add / Deduct
//         date: String,
//         note: String,
//       },
//     ],
//   },

//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("UserWeb", userwebSchema);



// const mongoose = require("mongoose");

// const userwebSchema = new mongoose.Schema({
//   name: { type: String, default: "" },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, default: "" },
//   password: { type: String, required: true }, // REQUIRED NOW

//   profileImage: { type: String, default: "" },

//   gender: { type: String, default: "" },
//   dob: { type: String, default: "" },
//   timeOfBirth: { type: String, default: "" },
//   placeOfBirth: { type: String, default: "" },
//   location: { type: String, default: "" },

//   kundli: {
//     moonSign: String,
//     ascendant: String,
//     nakshatra: String,
//     dasha: String,
//     kundliStatus: { type: String, default: "Not Generated" },
//     savedReports: [{ type: String }],
//   },

//   wallet: {
//     balance: { type: Number, default: 0 },
//     history: [
//       {
//         amount: Number,
//         type: String,
//         date: String,
//         note: String,
//       },
//     ],
//   },

//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("UserWeb", userwebSchema);































const mongoose = require("mongoose");

const relationshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other", "Prefer not to say"] },
  dob: { type: String, default: "" },
  profileImage: { type: String, default: "" },
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const userwebSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: "" },
  password: { type: String, required: true },
  
  profileImage: { type: String, default: "" },
  
  gender: { type: String, default: "" },
  dob: { type: String, default: "" },
  timeOfBirth: { type: String, default: "" },
  placeOfBirth: { type: String, default: "" },
  location: { type: String, default: "" },
  
  // Relationships
  children: [relationshipSchema],
  parents: [relationshipSchema],
  partners: [relationshipSchema],
  
  kundli: {
    moonSign: String,
    ascendant: String,
    nakshatra: String,
    dasha: String,
    kundliStatus: { type: String, default: "Not Generated" },
    savedReports: [{ type: String }],
  },
  
  wallet: {
    balance: { type: Number, default: 0 },
    history: [
      {
        amount: Number,
        type: String,
        date: String,
        note: String,
      },
    ],
  },
  
  // Calendar Events
  calendarEvents: [
    {
      title: { type: String, required: true },
      description: { type: String, default: "" },
      date: { type: Date, required: true },
      startTime: String,
      endTime: String,
      eventType: { type: String, enum: ["Call", "Follow-up", "Appointment", "Reminder"], default: "Appointment" },
      createdBy: { type: String, default: "Admin" },
      status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  
  orders: { type: Array, default: [] },
  payments: { type: Array, default: [] },
  remedies: { type: Array, default: [] },
  
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserWeb", userwebSchema);
