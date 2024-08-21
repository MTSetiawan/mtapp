import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useProfilePage = (userId) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isFollowingInitial, setIsFollowingInitial] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("login");
          return;
        }

        const url = userId
          ? `${import.meta.env.VITE_API_URL}/api/users/profile/${userId}`
          : `${import.meta.env.VITE_API_URL}/api/users/profile`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sortedPosts = response.data.posts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setProfile(response.data.user);
        setPosts(sortedPosts);

        if (userId) {
          const followersResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/followers/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFollowers(followersResponse.data);

          const checkFollowResponse = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/users/check-following?following_id=${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsFollowingInitial(checkFollowResponse.data.isFollowing);

          const followingResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/following/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFollowing(followingResponse.data);
        }

        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load");
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  useEffect(() => {
    const getLoggedInUserId = () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          setLoggedInUserId(decodedToken.id);
        }
      } catch (error) {
        console.error("Error decoding token", error);
      }
    };

    getLoggedInUserId();
  }, []);

  return {
    profile,
    posts,
    error,
    loading,
    loggedInUserId,
    isFollowingInitial,
    followers,
    following,
  };
};

export default useProfilePage;
