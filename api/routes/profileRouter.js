const express = require("express");
const multer = require("multer");
const path = require("path");
const authenticateUser = require("../middleware");

const db = require("../model/database");

const router = express.Router();

// Setup multer untuk menangani file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Tempat penyimpanan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  },
});

const upload = multer({ storage: storage });

// Endpoint untuk memperbarui gambar profil
router.post(
  "/update-profile-image",
  authenticateUser,
  upload.single("profile_image"), // Nama field sesuai dengan nama di FormData
  async (req, res) => {
    const userId = req.user.id;
    const profileImage = `${process.env.BASE_URL}/uploads/${req.file.filename}`; // Path file yang diupload

    const sql = "UPDATE users SET profile_image = ? WHERE id = ?";
    db.query(sql, [profileImage, userId], (err, result) => {
      if (err) {
        console.error("error", err);
      }
      res.status(200).json({
        message: "Profile image updated successfully",
        profile_image: profileImage,
        result,
      });
    });
  }
);

router.get("/update-profile-image", (req, res) => {
  res.send("hello");
});

module.exports = router;
