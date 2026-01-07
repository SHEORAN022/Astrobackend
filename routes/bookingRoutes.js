const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getAllBookings,
} = require("../controllers/bookingController");

const userWebAuth = require("../middleware/userwebAuthMiddleware");

// ===============================
// USER ROUTES
// ===============================

// Create booking
router.post("/", userWebAuth, createBooking);

// Get only my bookings
router.get("/my", userWebAuth, getMyBookings);

// ===============================
// ADMIN ROUTE (optional)
// ===============================

// Get all bookings
router.get("/all", userWebAuth, getAllBookings);

module.exports = router;
