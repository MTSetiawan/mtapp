import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MessageList = () => {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/conversations`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setConversations(response.data);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  const handleClick = (userId) => {
    navigate(`/message/${userId}`);
  };

  return (
    <div className="flex-grow p-4 min-h-screen bg-gray-200 ml-64">
      <h1 className="text-2xl font-semibold mb-4">Conversations</h1>

      {conversations.length > 0 ? (
        conversations.map((user) => (
          <button
            key={user.id}
            onClick={() => handleClick(user.id)}
            className="flex items-center space-x-4 p-3 bg-white hover:bg-gray-100 rounded-lg shadow-md transition duration-300 ease-in-out mb-2"
          >
            <div className="avatar">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={user.profile_image}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-800">
              {user.username}
            </span>
          </button>
        ))
      ) : (
        <p>No conversations found</p>
      )}
    </div>
  );
};

export default MessageList;
