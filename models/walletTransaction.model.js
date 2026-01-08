const mongoose = require("mongoose");

const WalletTransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    type: { type: String, enum: ["CREDIT", "DEBIT"], required: true },
    method: { type: String, enum: ["RAZORPAY", "WALLET", "SYSTEM"] },
    purpose: { type: String },
    referenceId: { type: String },
    paymentId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WalletTransaction", WalletTransactionSchema);
