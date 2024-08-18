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

router.put(
  "/update-profile-image",
  authenticateUser,
  upload.single("profile_image"),
  (req, res) => {
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

//  Username Update

router.put("/update-username", authenticateUser, (req, res) => {
  const { username } = req.body;
  const userId = req.user.id;

  if (!username) {
    return res.status(400).json({ error: "New username is required" });
  }

  try {
    if (username.length < 3 || username.length > 30) {
      return res
        .status(400)
        .json({ error: "Username must be between 3 and 30 characters" });
    }

    const result = db.query("UPDATE users SET username = ? WHERE id = ?", [
      username,
      userId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update username" });
  }
});

module.exports = router;
