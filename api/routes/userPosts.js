const express = require("express");
const db = require("../model/database");
const authenticateUser = require("../middleware");

const router = express.Router();

router.post("/posts", authenticateUser, (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const sql = "INSERT INTO users_posts (user_id,content) VALUES (?, ?)";
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
      `SELECT posts.*, users.username 
    FROM users_posts AS posts
    JOIN users ON posts.user_id = users.id;`
    );
    res.json(getAllPosts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
});

router.delete("/posts/:postId", authenticateUser, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const result = await db.query("SELECT * FROM users_posts WHERE id = ?", [
      postId,
    ]);
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

    await db.query("DELETE FROM users_posts WHERE id = ?", [postId]);
    res.status(200).json({ message: "Delete Posts succesfully" });
  } catch (error) {
    console.error("Errror delete Posts", error);
    res.status(500).json({ error: "Sever error" });
  }
});

module.exports = router;
