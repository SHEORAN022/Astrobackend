const Wallet = require("../models/wallet.model");
const WalletTransaction = require("../models/walletTransaction.model");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

/* ===============================
   CREATE RAZORPAY ORDER
================================ */
exports.createOrder = async (req, res) => {
  try {
    const { amount, userId } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `wallet_${userId}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("Order create error:", error);
    res.status(500).json({ success: false });
  }
};

/* ===============================
   VERIFY & CREDIT WALLET (WEBHOOK)
================================ */
exports.razorWebhook = async (req, res) => {
  try {
    const data = req.body.payload.payment.entity;

    const userId = req.body.userId; // frontend se attach hoga
    const amount = data.amount / 100;
    const paymentId = data.id;

    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      wallet = await Wallet.create({ userId, balance: amount });
    } else {
      wallet.balance += amount;
      await wallet.save();
    }

    await WalletTransaction.create({
      userId,
      amount,
      type: "CREDIT",
      method: "RAZORPAY",
      purpose: "WALLET_TOPUP",
      paymentId,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log("Webhook error:", error);
    res.status(500).json({ success: false });
  }
};

/* ===============================
   DEBIT FOR BOOKING/SERVICE
================================ */
exports.debitWallet = async (req, res) => {
  try {
    const { userId, amount, purpose, referenceId } = req.body;

    const wallet = await Wallet.findOne({ userId });
    if (!wallet || wallet.balance < amount)
      return res.status(400).json({ success: false, message: "INSUFFICIENT_BALANCE" });

    wallet.balance -= amount;
    await wallet.save();

    await WalletTransaction.create({
      userId,
      amount,
      type: "DEBIT",
      method: "WALLET",
      purpose,
      referenceId,
    });

    return res.json({ success: true, balance: wallet.balance });
  } catch (error) {
    console.log("Debit error:", error.message);
    res.status(500).json({ success: false });
  }
};

/* ===============================
   BALANCE
================================ */
exports.getBalance = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    return res.json({ success: true, balance: wallet?.balance || 0 });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* ===============================
   TRANSACTIONS
================================ */
exports.getTransactions = async (req, res) => {
  try {
    const tx = await WalletTransaction.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    return res.json({ success: true, transactions: tx });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
