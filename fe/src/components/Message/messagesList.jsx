/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

function MessageList({ userId, token }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/users/messages/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [userId, token]);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <p>
            {message.sender_id === userId ? "You" : "Them"}: {message.message}
          </p>
          <p>{new Date(message.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
