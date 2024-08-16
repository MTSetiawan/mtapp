import axios from "axios";
import { redirect } from "react-router-dom";

export const registerAction = async ({ request }) => {
  try {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      { username, password }
    );

    if (response.data) {
      return redirect("/login");
    }
  } catch (error) {
    console.error("error", error);
  }
};
export const loginAction = async ({ request }) => {
  try {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      { username, password }
    );

    if (response.data) {
      localStorage.setItem("token", response.data.token);
      return redirect("/dashboard");
    }
  } catch (error) {
    console.error("error", error);
  }
};

export const dashboardAction = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      return redirect("/login");
    }
    return { error: error.response?.data?.error || "Something went wrong" };
  }
};
