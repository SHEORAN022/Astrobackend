// const RemedyJourney = require("../models/RemedyJourney");

// /* GET ALL */
// exports.getAll = async (req, res) => {
//   try {
//     const data = await RemedyJourney.find()
//       .populate("user", "name email phone")
//       .sort({ createdAt: -1 });

//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// /* CREATE */
// exports.create = async (req, res) => {
//   try {
//     const remedy = await RemedyJourney.create(req.body);
//     res.status(201).json(remedy);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// /* UPDATE STATUS */
// exports.updateStatus = async (req, res) => {
//   try {
//     const updated = await RemedyJourney.findByIdAndUpdate(
//       req.params.id,
//       {
//         status: req.body.status,
//         lastActivity: new Date(),
//       },
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// /* DELETE */
// exports.remove = async (req, res) => {
//   try {
//     await RemedyJourney.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const RemedyJourney = require("../models/RemedyJourney");

/* ================= ADMIN ================= */

/* GET ALL (Admin) */
exports.getAll = async (req, res) => {
  try {
    const data = await RemedyJourney.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* CREATE (Admin assigns remedy) */
exports.create = async (req, res) => {
  try {
    const { user, remedyName, remedyType } = req.body;

    if (!user || !remedyName) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const remedy = await RemedyJourney.create({
      user,
      remedyName,
      remedyType,
    });

    res.status(201).json(remedy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE STATUS (Admin) */
exports.updateStatus = async (req, res) => {
  try {
    const updated = await RemedyJourney.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        lastActivity: new Date(),
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE (Admin) */
exports.remove = async (req, res) => {
  try {
    await RemedyJourney.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= USER ================= */

/* GET USER REMEDIES (by userId) */
exports.getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await RemedyJourney.find({ user: userId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* USER ADDS JOURNAL */
exports.addJournal = async (req, res) => {
  try {
    const { note } = req.body;

    const updated = await RemedyJourney.findByIdAndUpdate(
      req.params.id,
      {
        $push: { journal: { note } },
        lastActivity: new Date(),
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* USER MARKS COMPLETED */
exports.markCompleted = async (req, res) => {
  try {
    const updated = await RemedyJourney.findByIdAndUpdate(
      req.params.id,
      {
        status: "COMPLETED",
        lastActivity: new Date(),
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* USER SUBMITS FEEDBACK */
exports.addFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const updated = await RemedyJourney.findByIdAndUpdate(
      req.params.id,
      {
        feedback: {
          rating,
          comment,
          submittedAt: new Date(),
        },
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

