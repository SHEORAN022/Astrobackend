const mongoose = require("mongoose");

const AffirmationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true, // Cloudinary URL
    },
    publicId: {
      type: String, // Cloudinary public_id
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Affirmation", AffirmationSchema);
