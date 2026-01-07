
// // const mongoose = require("mongoose");

// // const consultationSchema = new mongoose.Schema(
// //   {
// //     clientName: { type: String, required: true },
// //     clientEmail: { type: String },
// //     astrologerName: { type: String, required: true },
// //     type: { type: String, enum: ["Chat", "Audio", "Video"], default: "Chat" },
// //     status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
// //     scheduledAt: { type: Date, default: Date.now },
// //     notes: { type: String },
// //     meetingLink: { type: String, default: "" },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Consultation", consultationSchema);
// // const mongoose = require("mongoose");

// // const consultationSchema = new mongoose.Schema(
// //   {
// //     clientName: { type: String, required: true },
// //     clientEmail: { type: String },
// //     astrologerName: { type: String, required: true },
// //     type: { type: String, enum: ["Chat", "Audio", "Video"], default: "Chat" },
// //     status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
// //     scheduledAt: { type: Date, default: Date.now },
// //     notes: { type: String },
// //     meetingLink: { type: String, default: "" },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Consultation", consultationSchema);

// const mongoose = require("mongoose");

// const consultationSchema = new mongoose.Schema(
//   {
//     clientName: { type: String, required: true },
//     clientEmail: { type: String },
//     astrologerName: { type: String, required: true },
//     type: { type: String, enum: ["Chat", "Audio", "Video"], default: "Chat" },
//     status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
//     scheduledAt: { type: Date, default: Date.now },
//     notes: { type: String },
//     meetingLink: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Consultation", consultationSchema);



const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    // 🔥 USER REFERENCE (MOST IMPORTANT)
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    clientName: {
      type: String,
      required: true,
    },

    clientEmail: {
      type: String,
      required: true,
    },

    astrologerName: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Chat", "Audio", "Video"],
      default: "Chat",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    meetingLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consultation", consultationSchema);

