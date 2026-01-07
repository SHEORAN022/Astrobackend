
// const express = require("express");
// const router = express.Router();
// const reportCtrl = require("../controllers/reportController");
// const { auth } = require("../middleware/auth");

// // ================= ANALYTICS =================
// router.get("/analytics/revenue-by-service", auth, reportCtrl.revenueByService);
// router.get("/analytics/top-services", auth, reportCtrl.topServices);
// router.get("/analytics/remedy-completion-rate", auth, reportCtrl.remedyCompletionRate);
// router.get("/analytics/call-success-rate", auth, reportCtrl.callSuccessRate);

// // ================= CRUD =================
// router.post("/", auth, reportCtrl.createReport);
// router.get("/", auth, reportCtrl.getReports);
// router.get("/:id", auth, reportCtrl.getReportById);
// router.put("/:id", auth, reportCtrl.updateReport);
// router.delete("/:id", auth, reportCtrl.deleteReport);

// module.exports = router;

const express = require("express");
const router = express.Router();
const reportCtrl = require("../controllers/reportController");
const { auth, admin } = require("../middleware/auth");

/* ================= USER ================= */
// 👤 User → apni ID se reports dekhe
router.get("/user/:userId", auth, reportCtrl.getUserReportsById);

// 👤 User / Admin → single report (ownership check controller me)
router.get("/:id", auth, reportCtrl.getReportById);

/* ================= ADMIN ================= */
// 👑 Admin → all reports
router.get("/", auth, admin, reportCtrl.getReports);

// 👑 Admin → create / update / delete
router.post("/", auth, admin, reportCtrl.createReport);
router.put("/:id", auth, admin, reportCtrl.updateReport);
router.delete("/:id", auth, admin, reportCtrl.deleteReport);

/* ================= ANALYTICS (ADMIN ONLY) ================= */
router.get("/analytics/revenue-by-service", auth, admin, reportCtrl.revenueByService);
router.get("/analytics/top-services", auth, admin, reportCtrl.topServices);
router.get("/analytics/remedy-completion-rate", auth, admin, reportCtrl.remedyCompletionRate);
router.get("/analytics/call-success-rate", auth, admin, reportCtrl.callSuccessRate);

module.exports = router;
