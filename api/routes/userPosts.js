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

module.exports = router;
