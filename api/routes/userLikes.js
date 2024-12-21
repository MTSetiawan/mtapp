const express = require("express");
const db = require("../model/database");
const authenticateUser = require("../middleware");
const validatePostId = require("../middleware");

const router = express.Router();

router.post("/like", authenticateUser, validatePostId, async (req, res) => {
  const { post_id } = req.body;
  const user_id = req.user.id;

  try {
    const [existingLike] = await db.query(
      "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
      [user_id, post_id]
    );
    if (existingLike.length > 0) {
      return res.status(400).json({ error: "Already liked this post." });
    }

    await db.query("INSERT INTO likes (user_id, post_id) VALUES (?, ?)", [
      user_id,
      post_id,
    ]);
    res.status(200).json({ message: "Post liked successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/unlike", authenticateUser, async (req, res) => {
  const { post_id } = req.body;
  const user_id = req.user.id;

  try {
    await db.query("DELETE FROM likes WHERE user_id = ? AND post_id = ?", [
      user_id,
      post_id,
    ]);

    res.status(200).json({ message: "Post unliked successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/check-like", authenticateUser, async (req, res) => {
  const { post_id } = req.query;
  const user_id = req.user.id;

  try {
    const [result] = await db.query(
      "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
      [user_id, post_id]
    );

    res.status(200).json({ isLiked: result.length > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/likes-count/:postId", authenticateUser, async (req, res) => {
  const { postId } = req.params;

  try {
    const [result] = await db.query(
      "SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?",
      [postId]
    );

    res.status(200).json({ likeCount: result[0].likeCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
