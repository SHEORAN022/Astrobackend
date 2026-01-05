// const express = require("express");
// const router = express.Router();

// const {
//   getAll,
//   create,
//   updateStatus,
//   remove,
// } = require("../controllers/remedyJourneyController");

// /* MATCHES FRONTEND EXACTLY */
// router.get("/", getAll);
// router.post("/", create);
// router.put("/:id/status", updateStatus);
// router.delete("/:id", remove);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAll,
  create,
  updateStatus,
  remove,
  getByUserId,
  addJournal,
  markCompleted,
  addFeedback,
} = require("../controllers/remedyJourneyController");

/* ================= ADMIN ================= */
router.get("/", getAll);
router.post("/", create);
router.put("/:id/status", updateStatus);
router.delete("/:id", remove);

/* ================= USER ================= */
router.get("/user/:userId", getByUserId);      // user apni remedies dekhe
router.post("/:id/journal", addJournal);       // daily journal
router.put("/:id/complete", markCompleted);    // mark complete
router.post("/:id/feedback", addFeedback);     // feedback

module.exports = router;
