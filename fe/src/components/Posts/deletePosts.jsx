import axios from "axios";

const DeletePostButton = (postId) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You need to log in first");
        return;
      }

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message);
      alert("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Delete Post
    </button>
  );
};

export default DeletePostButton;
