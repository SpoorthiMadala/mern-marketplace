const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../utils/cloudinary");
const auth = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer();

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "marketplace" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

module.exports = router;
