import axios from "axios";
import { useEffect, useState } from "react";

const LikeButton = ({ postId, initialLikes = 0, userLiked = false }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(userLiked);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }
        const [likesRes, likedRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/likes-count/${postId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(`${import.meta.env.VITE_API_URL}/api/users/check-like`, {
            params: { post_id: postId },
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setLikes(likesRes.data.likeCount);
        setLiked(likedRes.data.isLiked);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [postId]);

  const handleLikes = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/like`,
        { post_id: postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikes(likes + 1);
      setLiked(true);
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/unlike`,
        { post_id: postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikes(likes - 1);
      setLiked(false);
    } catch (error) {
      console.error("Error unliking post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-wrap">
      <button
        disabled={loading}
        onClick={liked ? handleUnlike : handleLikes}
        className={`text-white font-bold py-2 px-4 rounded ${
          liked ? "bg-red-500" : "bg-blue-500"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Processing..." : liked ? "Unlike" : "Like"}
      </button>
      <span className="ml-2 text-sm">
        {likes} {likes === 1 ? "like" : "likes"}
      </span>
    </div>
  );
};

export default LikeButton;
