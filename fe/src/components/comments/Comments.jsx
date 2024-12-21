import { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");

  // Mengambil komentar berdasarkan postId
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/posts/${postId}/comments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Comments", response.data);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  // Menambahkan komentar baru
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return; // Tidak kirim komentar kosong

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/posts/${postId}/comments`,
        { content: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Menambahkan komentar yang baru ditambahkan ke state
      setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment(""); // Reset input setelah kirim komentar
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-2 border rounded bg-gray-100"
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Submit Comment
        </button>
      </form>

      <div className="mt-4">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-2 mt-2 border-b">
              <strong>{comment.username}</strong>
              <p>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
