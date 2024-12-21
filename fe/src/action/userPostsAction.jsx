import axios from "axios";
import { redirect } from "react-router-dom";

export const getAllPostAction = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/users/posts`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      return redirect("/login");
    }
    return { error: error.response?.data?.error || "Something went wrong" };
  }
};

export const getDetailPostsAction = async (postId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/users/posts/${postId}`, // Menambahkan postId pada URL
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Posts not Found");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      return redirect("/login");
    }
    return { error: error.response?.data?.error || "Something went wrong" };
  }
};

export const createPostAction = async ({ request }) => {
  const token = localStorage.getItem("token");
  const form = await request.formData();
  const contentPosts = form.get("contentPosts");
  console.log("Content", contentPosts);

  if (!contentPosts) {
    return { error: "Content is required" };
  }

  const data = {
    content: contentPosts,
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/posts`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error: error };
  }
};
