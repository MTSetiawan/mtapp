const express = require("express");
const db = require("../model/database");
const authenticateUser = require("../middleware");

const router = express.Router();

router.post("/posts", authenticateUser, (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const sql = "INSERT INTO posts (user_id,content) VALUES (?, ?)";
    const result = db.query(sql, [userId, content]);
    const posts = result.insertId;

    res.status(200).json({ message: "Posts succesfully", posts });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({ error: "Failed Posts" });
  }
});

router.get("/posts", authenticateUser, async (req, res) => {
  try {
    const [getAllPosts] = await db.query(
      `SELECT 
    posts.*, 
    users.username, 
    (SELECT COUNT(*) FROM comments WHERE post_id = posts.id) AS comment_count
FROM 
    posts
JOIN 
    users 
ON 
    posts.user_id = users.id;

  `
    );
    res.json(getAllPosts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
});

router.get("/posts/:postId", authenticateUser, async (req, res) => {
  const { postId } = req.params;

  const sql = `
    SELECT posts.*, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = ?;`;
  try {
    const [detailPosts] = await db.query(sql, [postId]);

    if (detailPosts.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(detailPosts[0]);
  } catch (err) {
    console.error("Error fetching post details:", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

router.delete("/posts/:postId", authenticateUser, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const result = await db.query("SELECT * FROM posts WHERE id = ?", [postId]);
    const post = result[0];
    if (post.length === 0) {
      return res.status(404).json({ message: "Posts not found" });
    }

    if (post[0].user_id !== userId) {
      console.log("User ID:", userId);
      console.log("Post Owner ID:", post[0].user_id);
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await db.query("DELETE FROM posts WHERE id = ?", [postId]);
    res.status(200).json({ message: "Delete Posts succesfully" });
  } catch (error) {
    console.error("Errror delete Posts", error);
    res.status(500).json({ error: "Sever error" });
  }
});

module.exports = router;
