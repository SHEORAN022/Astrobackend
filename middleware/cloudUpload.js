// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const cloudUpload = (folder = "know_more") => {
//   const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//       folder,
//       resource_type: "raw", // ✅ PDF MUST be RAW
//       format: "pdf",
//       public_id: `${Date.now()}`,
//     },
//   });

//   return multer({
//     storage,
//     limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
//   });
// };

// module.exports = cloudUpload;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

/**
 * UNIVERSAL UPLOADER
 * @param {string} folder - cloudinary folder name
 */
const cloudUpload = (folder = "uploads") => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder,
        resource_type: "auto", // ✅ IMAGE + AUDIO + VIDEO + PDF
        public_id: `${folder}/${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}`,
      };
    },
  });

  return multer({
    storage,
    limits: {
      fileSize: 50 * 1024 * 1024, // ✅ 50MB (video safe)
    },
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = [
        // 🖼 Images
        "image/jpeg",
        "image/png",
        "image/webp",

        // 🎵 Audio
        "audio/mpeg",
        "audio/mp3",
        "audio/wav",
        "audio/x-m4a",

        // 🎥 Video
        "video/mp4",
        "video/quicktime",
        "video/x-matroska",

        // 📄 Documents
        "application/pdf",
      ];

      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Invalid file type. Only image, audio, video & PDF allowed."
          )
        );
      }
    },
  });
};

module.exports = cloudUpload;
