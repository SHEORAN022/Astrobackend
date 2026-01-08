
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminAuth");

const {
  getMyWallet,
  getAllWallets,
} = require("../controllers/walletController");

// 👤 USER → sirf apni wallet
router.get("/my-wallet", authMiddleware, getMyWallet);

// 👑 ADMIN → sab users ki wallet
router.get(
  "/admin/wallets",
  authMiddleware,
  adminMiddleware,
  getAllWallets
);

module.exports = router;
