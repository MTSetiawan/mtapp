const express = require("express");
const db = require("../model/database");
const authenticateUser = require("../middleware");

const router = express.Router();

router.post("/message", authenticateUser, async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  if (!sender_id || !receiver_id || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
      [sender_id, receiver_id, message]
    );
    res.status(201).json({ message: "Message sent", id: result.insertId });
  } catch (error) {
    console.error("Error during message insertion:", error); // Menambahkan log yang lebih jelas
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get(
  "/message/:userId/:receiverId",
  authenticateUser,
  async (req, res) => {
    const { userId, receiverId } = req.params;

    if (!userId || !receiverId) {
      return res
        .status(400)
        .json({ error: "Sender ID and Receiver ID are required" });
    }

    try {
      const [messages] = await db.execute(
        "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at",
        [userId, receiverId, receiverId, userId]
      );
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
);

router.get("/message/:receiverId", async (req, res) => {
  const receiverId = req.params.receiverId;

  try {
    // Query untuk mendapatkan data pengguna berdasarkan receiverId
    const query = "SELECT username FROM users WHERE id = ?";
    const [rows] = await db.execute(query, [receiverId]);

    // Cek apakah pengguna ditemukan
    if (rows.length > 0) {
      return res.json({ name: rows[0].username });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user name:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/conversations", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      `
        SELECT DISTINCT u.id, u.username, u.profile_image 
        FROM users u
        INNER JOIN messages m ON m.sender_id = u.id OR m.receiver_id = u.id
        WHERE (m.sender_id = ? OR m.receiver_id = ?) AND u.id != ?
      `,
      [userId, userId, userId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
