const express = require("express");
const db = require("../model/database");
const authenticateUser = require("../middleware");

const router = express.Router();

router.post("/like", authenticateUser, async (req, res) => {
  const { postId } = req.body;
  const userId = req.user.id;

  try {
    const sql = "INSERT INTO likes (post_id, user_id) VALUES (?, ?)";
    const [resul] = await db.query(sql, [postId, userId]);
    res.status(201).json({ message: "like succesfully" });
  } catch (error) {
    console.error("Error like Posts", error);
    res.status(500).json({ error: "Failed to likes posts" });
  }
});

module.exports = router;
