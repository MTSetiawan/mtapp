import axios from "axios";
import { redirect } from "react-router-dom";

export const registerAction = async ({ request }) => {
  try {
    const form = await request.formData();
    const username = form.get("username");
    const email = form.get("email");
    const password = form.get("password");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/register`,
      { username, email, password }
    );

    console.log("Response from API:", response);
    if (response.status === 201) {
      console.log("Redirecting to /login");
      return redirect("/login");
    } else {
      console.error("Response data missing or invalid");
    }
  } catch (error) {
    console.error("error", error);
  }
};

export const loginAction = async ({ request }) => {
  try {
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/login`,
      { email, password }
    );

    if (response.status === 201) {
      const { token } = response.data;

      localStorage.setItem("token", token);

      return redirect("/dashboard");
    } else {
      console.error("Login failed:", response.data.message);
    }
  } catch (error) {
    console.error("Error during login:", error.message);
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

export const logoutAction = () => {
  localStorage.removeItem("token");

  return redirect("/login");
};
