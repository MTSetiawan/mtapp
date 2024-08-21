/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";

const FollowButton = ({ userId, isFollowingInitial }) => {
  const [following, setFollowing] = useState(isFollowingInitial);

  useEffect(() => {
    setFollowing(isFollowingInitial);
  }, [isFollowingInitial]);

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/follow`,
        {
          following_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowing(true);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/unfollow`,
        {
          following_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowing(false);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <button
      onClick={following ? handleUnfollow : handleFollow}
      className={`btn ${
        following ? "bg-red-500" : "bg-blue-500"
      } text-white px-4 py-2 rounded`}
    >
      {following ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
