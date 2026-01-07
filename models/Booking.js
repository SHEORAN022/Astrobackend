const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserWeb",
      required: true,
    },

    service: {
      type: String,
      required: true,
    },

    date: String,
    time: String,

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    amount: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
