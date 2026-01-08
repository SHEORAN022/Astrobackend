const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  type: { type: String, enum: ["CREDIT", "DEBIT"] },
  method: { type: String, enum: ["RAZORPAY", "WALLET", "SYSTEM"] },
  purpose: { type: String },        // Booking / Recharge etc
  referenceId: { type: String },    // bookingId/paymentId
  paymentId: { type: String },      // Razorpay Payment
}, { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
