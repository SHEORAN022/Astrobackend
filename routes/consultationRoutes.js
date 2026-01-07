

// // const express = require("express");
// // const router = express.Router();
// // const {
// //   getConsultations,
// //   createConsultation,
// //   updateConsultation,
// //   deleteConsultation,
// // } = require("../controllers/consultationController");

// // router.get("/", getConsultations);
// // router.post("/", createConsultation); // Auto link + email
// // router.put("/:id", updateConsultation);
// // router.delete("/:id", deleteConsultation);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   getConsultations,
//   createConsultation,
//   updateConsultation,
//   deleteConsultation,
// } = require("../controllers/consultationController");

// router.get("/", getConsultations);
// router.post("/", createConsultation); // Auto real Google Meet link + email
// router.put("/:id", updateConsultation);
// router.delete("/:id", deleteConsultation);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  getConsultations,        // 👑 Admin: all consultations
  getUserConsultations,    // 👤 User: only own consultations
  createConsultation,
  updateConsultation,
  deleteConsultation,
} = require("../controllers/consultationController");

/* ============================
   👑 ADMIN ROUTES
============================ */
router.get("/", getConsultations);          // GET all consultations (Admin)

/* ============================
   👤 USER ROUTES
============================ */
router.get("/user/:userId", getUserConsultations); // GET own consultations

/* ============================
   COMMON ROUTES
============================ */
router.post("/", createConsultation);       // Create consultation (User)
router.put("/:id", updateConsultation);     // Update consultation (Admin)
router.delete("/:id", deleteConsultation);  // Delete consultation (Admin)

module.exports = router;

