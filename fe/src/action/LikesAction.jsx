import axios from "axios";

export const usersLikeAction = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/like`,
      { postId: post.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {}
};
