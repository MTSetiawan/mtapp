const db = require("./database");

const sendMessage = async (senderId, receiverId, message) => {
  const [result] = await db.query(
    `INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`,
    [senderId, receiverId, message]
  );
  return result;
};

module.exports = sendMessage;
