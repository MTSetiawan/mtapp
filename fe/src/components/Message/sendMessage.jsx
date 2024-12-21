/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const SendMessage = ({ receiverId, token }) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      await axios.post(
        "/api/messages",
        { receiver_id: receiverId, message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default SendMessage;
