const express = require("express");
const db = require("../model/database");
const authenticateUser = require("../middleware");

const router = express.Router();
router.get("/posts/:postId/comments", authenticateUser, async (req, res) => {
  const { postId } = req.params;

  const sql =
    "SELECT comments.*, users.username, profile_image FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = ?";
  try {
    const [comments] = await db.query(sql, [postId]);
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

router.post("/posts/:postId/comments", authenticateUser, async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;
  console.log(content);

  if (!content) {
    return res.status(400).json({ message: "Comment content is required" });
  }

  const sql =
    "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)";
  try {
    await db.query(sql, [postId, userId, content]);
    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    console.error("Error adding comment:", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = router;
