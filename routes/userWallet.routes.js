const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");

// Topup Order (Razorpay)
router.post("/topup/order", walletController.createOrder);

// Razorpay Webhook
router.post("/topup/webhook", walletController.razorWebhook);

// Spend Wallet (Booking / Chat etc)
router.post("/spend", walletController.debitWallet);

// User Wallet Balance
router.get("/:userId/balance", walletController.getBalance);

// Wallet Statement / History
router.get("/:userId/statement", walletController.getTransactions);

module.exports = router;
