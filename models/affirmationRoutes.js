const express = require("express");
const cloudUpload = require("../middleware/cloudUpload");
const cloudinary = require("../config/cloudinary");
const Affirmation = require("../models/Affirmation");

const router = express.Router();

/* =====================================================
   CREATE AFFIRMATION (ADMIN)
===================================================== */
router.post(
  "/",
  cloudUpload("affirmations").single("image"),
  async (req, res) => {
    try {
      if (!req.body.text || !req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Text & image are required" });
      }

      const affirmation = await Affirmation.create({
        text: req.body.text,
        image: req.file.path,      // Cloudinary URL
        publicId: req.file.filename || req.file.public_id,
      });

      res.status(201).json({
        success: true,
        message: "Affirmation created",
        data: affirmation,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

/* =====================================================
   READ ALL AFFIRMATIONS (ADMIN + WEBSITE)
===================================================== */
router.get("/", async (req, res) => {
  try {
    const affirmations = await Affirmation.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: affirmations.length,
      data: affirmations,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* =====================================================
   READ SINGLE AFFIRMATION
===================================================== */
router.get("/:id", async (req, res) => {
  try {
    const affirmation = await Affirmation.findById(req.params.id);
    if (!affirmation) {
      return res
        .status(404)
        .json({ success: false, message: "Affirmation not found" });
    }

    res.json({ success: true, data: affirmation });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
});

/* =====================================================
   UPDATE AFFIRMATION (TEXT / IMAGE)
===================================================== */
router.put(
  "/:id",
  cloudUpload("affirmations").single("image"),
  async (req, res) => {
    try {
      const affirmation = await Affirmation.findById(req.params.id);
      if (!affirmation) {
        return res
          .status(404)
          .json({ success: false, message: "Affirmation not found" });
      }

      // Update text
      if (req.body.text) affirmation.text = req.body.text;

      // Update image
      if (req.file) {
        // Delete old image from Cloudinary
        if (affirmation.publicId) {
          await cloudinary.uploader.destroy(
            affirmation.publicId,
            { resource_type: "image" }
          );
        }

        affirmation.image = req.file.path;
        affirmation.publicId =
          req.file.filename || req.file.public_id;
      }

      await affirmation.save();

      res.json({
        success: true,
        message: "Affirmation updated",
        data: affirmation,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

/* =====================================================
   DELETE AFFIRMATION (ADMIN)
===================================================== */
router.delete("/:id", async (req, res) => {
  try {
    const affirmation = await Affirmation.findById(req.params.id);
    if (!affirmation) {
      return res
        .status(404)
        .json({ success: false, message: "Affirmation not found" });
    }

    // Delete image from Cloudinary
    if (affirmation.publicId) {
      await cloudinary.uploader.destroy(
        affirmation.publicId,
        { resource_type: "image" }
      );
    }

    await affirmation.deleteOne();

    res.json({
      success: true,
      message: "Affirmation deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
