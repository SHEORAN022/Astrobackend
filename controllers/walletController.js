// // const Wallet = require("../models/Wallet");

// // exports.getWallet = async (req, res) => {
// //   try {
// //     let wallet = await Wallet.findOne({ userId: req.params.userId });

// //     if (!wallet) {
// //       wallet = await Wallet.create({
// //         userId: req.params.userId,
// //         balance: 0,
// //         transactions: [],
// //       });
// //     }

// //     res.json({ success: true, wallet });
// //   } catch (err) {
// //     res.status(500).json({ success: false, error: err.message });
// //   }
// // };

// // exports.addMoneyToWallet = async (userId, amount) => {
// //   let wallet = await Wallet.findOne({ userId });

// //   if (!wallet) {
// //     wallet = await Wallet.create({
// //       userId,
// //       balance: amount,
// //       transactions: [{ amount, type: "credit" }],
// //     });
// //     return wallet;
// //   }

// //   wallet.balance += amount;
// //   wallet.transactions.push({ amount, type: "credit" });
// //   await wallet.save();

// //   return wallet;
// // };
// const Wallet = require("../models/Wallet");

// /* ===========================================================
//    ⭐ GET WALLET
// =========================================================== */
// exports.getWallet = async (req, res) => {
//   try {
//     let wallet = await Wallet.findOne({ userId: req.params.userId });

//     // If wallet doesn't exist → create new
//     if (!wallet) {
//       wallet = await Wallet.create({
//         userId: req.params.userId,
//         balance: 0,
//         transactions: [],
//       });
//     }

//     return res.json({
//       success: true,
//       wallet,
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };

// /* ===========================================================
//    ⭐ ADD MONEY TO WALLET (Used in Payment Verify)
// =========================================================== */
// exports.addMoneyToWallet = async (userId, amount) => {
//   amount = Number(amount);

//   let wallet = await Wallet.findOne({ userId });

//   // Create wallet if not found
//   if (!wallet) {
//     wallet = await Wallet.create({
//       userId,
//       balance: amount,
//       transactions: [
//         {
//           type: "credit",
//           amount,
//           date: new Date(),
//         },
//       ],
//     });
//     return wallet;
//   }

//   // Update existing wallet
//   wallet.balance += amount;
//   wallet.transactions.push({
//     type: "credit",
//     amount,
//     date: new Date(),
//   });

//   await wallet.save();
//   return wallet;
// };

const User = require("../models/User");
const UserWeb = require("../models/userwebUser");

/* 👤 USER / WEBSITE USER → Get My Wallet */
exports.getMyWallet = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    // ✅ 1️⃣ WEBSITE USER FIRST
    const webUser = await UserWeb.findById(userId).select("wallet");
    if (webUser) {
      return res.json({
        success: true,
        balance: webUser.wallet?.balance || 0,
      });
    }

    // ✅ 2️⃣ ADMIN USER FALLBACK
    const adminUser = await User.findById(userId).select("wallet");
    if (adminUser) {
      return res.json({
        success: true,
        balance: adminUser.wallet?.balance || 0,
      });
    }

    // ❌ Agar dono jagah nahi mila
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  } catch (err) {
    console.error("❌ getMyWallet error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch wallet",
    });
  }
};

/* 💰 ADD MONEY TO WALLET */
exports.addMoneyToWallet = async (userId, amount, note = "Wallet Top-up") => {
  amount = Number(amount);
  if (!amount || amount <= 0) return;

  // ✅ Website user first
  const webUser = await UserWeb.findById(userId);
  if (webUser) {
    webUser.wallet.balance += amount;
    webUser.wallet.history.push({
      amount,
      type: "credit",
      date: new Date().toISOString(),
      note,
    });
    await webUser.save();
    return webUser.wallet.balance;
  }

  // ✅ Admin fallback
  const adminUser = await User.findById(userId);
  if (adminUser) {
    adminUser.wallet.balance += amount;
    await adminUser.save();
    return adminUser.wallet.balance;
  }

  throw new Error("User not found");
};

/* 👑 ADMIN → All Admin Wallets */
exports.getAllWallets = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email wallet")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch wallets",
    });
  }
};
