const express = require("express");
const router = express.Router();
const {
  getAccount,
  addFunds,
  deductFunds,
  refundFunds
} = require("../controllers/accountController");

// GET Account
router.get("/:userId", getAccount);

// CREDIT
router.post("/add-funds", addFunds);

// DEBIT
router.post("/deduct", deductFunds);

// REFUND
router.post("/refund", refundFunds);

module.exports = router;
