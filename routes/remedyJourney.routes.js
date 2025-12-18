const express = require("express");
const router = express.Router();

const {
  getAll,
  create,
  updateStatus,
  remove,
} = require("../controllers/remedyJourneyController");

/* MATCHES FRONTEND EXACTLY */
router.get("/", getAll);
router.post("/", create);
router.put("/:id/status", updateStatus);
router.delete("/:id", remove);

module.exports = router;
