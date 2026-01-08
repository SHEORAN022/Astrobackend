// // const express = require("express");
// // const router = express.Router();
// // const { createOrder, verifyPayment } = require("../controllers/paymentController");

// // router.post("/create-order", createOrder);
// // router.post("/verify", verifyPayment);

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const { createOrder, verifyPayment } = require("../controllers/paymentController");

// router.post("/create-order", createOrder);
// router.post("/verify", verifyPayment);

// module.exports = router;

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createOrder, verifyPayment } = require("../controllers/paymentController");

// 🔐 AUTH REQUIRED (VERY IMPORTANT)
router.post("/create-order", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);

module.exports = router;
