const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    balance: {
      type: Number,
      default: 0
    },
    transactions: [
      {
        type: {
          type: String,
          enum: ["credit", "debit", "refund"],
          required: true
        },
        amount: {
          type: Number,
          required: true
        },
        description: {
          type: String
        },
        referenceId: {
          type: String // booking, payment, txn reference id
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAccount", accountSchema);
