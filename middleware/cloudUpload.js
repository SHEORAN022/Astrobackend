const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const cloudUpload = (folder = "know_more") => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      resource_type: "raw", // ✅ PDF MUST be RAW
      format: "pdf",
      public_id: `${Date.now()}`,
    },
  });

  return multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  });
};

module.exports = cloudUpload;
