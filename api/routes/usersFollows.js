const express = require("express");
const db = require("../model/database");
const authenticateUser = require("../middleware");

const router = express.Router();

router.post("/follow", authenticateUser, async (req, res) => {
  const { following_id } = req.body;
  const follower_id = req.user.id;

  if (follower_id === following_id) {
    return res.status(400).json({ error: "Cannot Follow Yourself" });
  }

  try {
    const [existingFOLLOW] = await db.query(
      "SELECT * FROM follows WHERE follower_id = ? AND following_id = ?",
      [follower_id, following_id]
    );
    if (existingFOLLOW.length > 0) {
      return res.status(400).json({ error: "Already following this user." });
    }

    await db.query(
      "INSERT INTO follows (follower_id, following_id) VALUES (?, ?)",
      [follower_id, following_id]
    );
    res.status(200).json({ message: "Followed Succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/unfollow", authenticateUser, async (req, res) => {
  const { following_id } = req.body;
  const follower_id = req.user.id;

  try {
    await db.query(
      "DELETE FROM follows WHERE follower_id = ? AND following_id = ?",
      [follower_id, following_id]
    );

    res.status(200).json({ message: "Unfollowed successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/check-following", authenticateUser, async (req, res) => {
  const { following_id } = req.query;
  const follower_id = req.user.id;

  try {
    const [result] = await db.query(
      "SELECT * FROM follows WHERE follower_id = ? AND following_id = ?",
      [follower_id, following_id]
    );

    res.status(200).json({ isFollowing: result.length > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/followers/:userId", authenticateUser, async (req, res) => {
  const { userId } = req.params;

  try {
    const [followers] = await db.query(
      "SELECT u.id, u.username, u.profile_image FROM follows f JOIN users u ON f.follower_id = u.id WHERE f.following_id = ?",
      [userId]
    );

    res.status(200).json(followers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/following/:userId", authenticateUser, async (req, res) => {
  const { userId } = req.params;

  try {
    const [results] = await db.query(
      "SELECT u.id, u.username, u.profile_image FROM follows f JOIN users u ON f.following_id = u.id WHERE f.follower_id = ?",
      [userId]
    );

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
