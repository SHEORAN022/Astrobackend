
// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     customerName: { type: String, required: true },
//     email: { type: String, required: true },
//     serviceType: { type: String, required: true },
//     price: { type: Number, required: true },
//     status: {
//       type: String,
//       enum: ["Pending", "In Progress", "Completed"],
//       default: "Pending",
//     },
//     fileUrl: { type: String },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);

const express = require("express");
const router = express.Router();
const cloudUpload = require("../middleware/cloudUpload");

const upload = cloudUpload("orders");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", upload.single("file"), createOrder);
router.put("/:id", upload.single("file"), updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
