import { useState } from "react";
import MessageList from "../../components/Message/messagesList";
import SendMessage from "../../components/Message/sendMessage";
import { useParams } from "react-router-dom";

function MessagePage() {
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const [receiverId, setReceiverId] = useState("");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      <div className="mb-4">
        <label
          htmlFor="receiver"
          className="block text-sm font-medium text-gray-700"
        >
          Select User to Message:
        </label>
        <input
          type="text"
          id="receiver"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          placeholder="Enter Receiver ID"
        />
      </div>

      <div className="mb-4">
        <MessageList userId={userId} token={token} />
      </div>

      <div>
        <SendMessage receiverId={receiverId} token={token} />
      </div>
    </div>
  );
}

export default MessagePage;
