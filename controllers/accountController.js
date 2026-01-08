const UserAccount = require("../models/UserAccount");

// GET or CREATE account
exports.getAccount = async (req, res) => {
  try {
    const userId = req.params.userId;

    let account = await UserAccount.findOne({ userId });

    if (!account) {
      account = await UserAccount.create({
        userId,
        balance: 0,
        transactions: []
      });
    }

    res.json({ success: true, account });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CREDIT (Add Funds to wallet)
exports.addFunds = async (req, res) => {
  try {
    const { userId, amount, description, referenceId } = req.body;

    let account = await UserAccount.findOne({ userId });

    if (!account) {
      account = await UserAccount.create({
        userId,
        balance: amount,
        transactions: [{ type: "credit", amount, description, referenceId }]
      });
    } else {
      account.balance += amount;
      account.transactions.push({
        type: "credit",
        amount,
        description,
        referenceId
      });
      await account.save();
    }

    res.json({ success: true, account });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DEBIT (Deduct for Booking etc)
exports.deductFunds = async (req, res) => {
  try {
    const { userId, amount, description, referenceId } = req.body;

    let account = await UserAccount.findOne({ userId });
    if (!account)
      return res.status(404).json({ success: false, message: "Account not found" });

    if (account.balance < amount)
      return res.status(400).json({ success: false, message: "Insufficient balance" });

    account.balance -= amount;
    account.transactions.push({
      type: "debit",
      amount,
      description,
      referenceId
    });

    await account.save();
    res.json({ success: true, account });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// REFUND (Optional)
exports.refundFunds = async (req, res) => {
  try {
    const { userId, amount, description, referenceId } = req.body;

    let account = await UserAccount.findOne({ userId });
    if (!account)
      return res.status(404).json({ success: false, message: "Account not found" });

    account.balance += amount;
    account.transactions.push({
      type: "refund",
      amount,
      description,
      referenceId
    });

    await account.save();
    res.json({ success: true, account });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
