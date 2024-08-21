const express = require("express");
const authenticateUser = require("../middleware");
const db = require("../model/database");

const router = express.Router();

router.get("/message/:userId", authenticateUser, async (req, res) => {
  const userId1 = req.user.id;
  const userId2 = req.params.userId;

  const sql = `SELECT users_message.*, 
        sender.username AS sender_username, 
        receiver.username AS receiver_username 
        FROM users_message
        JOIN users AS sender ON users_message.send_id = sender.id 
        JOIN users AS receiver ON users_message.receiver_id = receiver.id 
        WHERE (send_id = ? AND receiver_id = ?)
        OR (send_id = ? AND receiver_id = ?)
        ORDER BY users_message.created_at ASC`;

  try {
    const [rows] = await db.query(sql, [userId1, userId2, userId2, userId1]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error get message", error);
    res.status(500).json("Failded to get message");
  }
});

router.post("/message", authenticateUser, async (req, res) => {
  const { receiverId, message } = req.body;
  const senderId = req.user.id;

  const sql = `INSERT INTO users_message (send_id, receiver_id, message) VALUES (?, ?, ?)`;
  try {
    const result = await db.query(sql, [senderId, receiverId, message]);
    res.status(201).json({
      message: "Message send succesfully",
      messageId: result.insertId,
    });
  } catch (error) {
    console.error("Error send Message", error);
    res.status(500).json({ error: "Failed to send Message" });
  }
});

module.exports = router;