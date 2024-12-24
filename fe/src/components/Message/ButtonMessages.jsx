import { Link } from "react-router-dom";

const MessageButton = ({ receiverId }) => {
  if (!receiverId) return null;

  return (
    <Link
      to={`/message/${receiverId}`}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Message
    </Link>
  );
};

export default MessageButton;
