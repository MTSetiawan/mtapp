const express = require("express");
const multer = require("multer");
const path = require("path");
const authenticateUser = require("../middleware");

const db = require("../model/database");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post(
  "/update-profile-image",
  authenticateUser,
  upload.single("profile_image"),
  async (req, res) => {
    const userId = req.user.id;
    const profileImage = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

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

module.exports = router;
