/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

const LikeButton = ({ postId, initialLikes, userLiked }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(userLiked);

  useEffect(() => {
    const fetchLikesCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/likes-count/${postId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikes(response.data.likeCount);
      } catch (error) {
        console.error("Error fetching likes count:", error);
      }
    };

    const checkUserLiked = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/check-like`,
          {
            params: { posts_id: postId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLiked(response.data.isLiked);
      } catch (error) {
        console.error("Error checking if user liked:", error);
      }
    };

    fetchLikesCount();
    checkUserLiked();
  }, [postId]);

  const handleLikes = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/like`,
        { posts_id: postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikes(likes + 1);
      setLiked(true);
    } catch (error) {
      console.error("error like posts", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/unlike`,
        { posts_id: postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikes(likes - 1);
      setLiked(false);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };
  return (
    <div className="flex items-center">
      <button
        onClick={liked ? handleUnlike : handleLikes}
        className={`text-white font-bold py-2 px-4 rounded ${
          liked ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        {liked ? "Unlike" : "Like"}
      </button>
      <span className="ml-2">{likes}</span>
    </div>
  );
};

export default LikeButton;
