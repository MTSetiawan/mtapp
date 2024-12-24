import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MessagePage = () => {
  const { receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [receiverName, setReceiverName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodeToken = jwtDecode(token);
    setCurrentUserId(decodeToken.id);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/message/${
            decodeToken.id
          }/${receiverId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    const fetchReceiverName = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/message/${receiverId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReceiverName(response.data.name);
      } catch (error) {
        console.error("Failed to fetch receiver's name:", error);
      }
    };

    fetchMessages();
    fetchReceiverName();
  }, [receiverId]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const token = localStorage.getItem("token");
    const decodeToken = jwtDecode(token);
    const currentUserId = decodeToken.id;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/message`,
        {
          sender_id: currentUserId,
          receiver_id: receiverId,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages([
        ...messages,
        { sender_id: currentUserId, message: message },
      ]);
      setMessage("");
    } catch (error) {
      console.error(
        "Failed to send message:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Chat with {receiverName || "User {receiverId}"}{" "}
      </h1>

      <div className="flex-grow bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        <div
          className="space-y-4"
          style={{
            height: "calc(100vh - 150px)", // Adjust the height of the message container
            overflowY: "auto",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender_id === currentUserId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg shadow-md ${
                  msg.sender_id === currentUserId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagePage;
