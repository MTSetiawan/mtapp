const express = require("express");
const db = require("../model/database");
const authenticateUser = require("../middleware");

const router = express.Router();

router.post("/messages", authenticateUser, async (req, res) => {
  const { receiver_id, messages } = req.body;
  const sender_id = req.user.id;

  if (!receiver_id || !messages) {
    return res
      .status(400)
      .json({ message: "Receiver ID and message are required" });
  }

  try {
    const sql =
      "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)";
    const newMessage = await db.query(sql, [sender_id, receiver_id, messages]);
    res.status(200).json({
      message: "Message send succesfully",
      messageId: newMessage.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("messages/:userId", authenticateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const messages = await db.query(
      "SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY created_at DESC",
      [userId, userId]
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving messages", error });
  }
});

module.exports = router;
