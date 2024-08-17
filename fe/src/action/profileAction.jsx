import axios from "axios";
import { redirect } from "react-router-dom";

export const potoProfileAction = async ({ request }) => {
  const token = localStorage.getItem("token");
  const form = await request.formData();

  const profile_picture = form.get("profile_picture");

  const formData = new FormData();
  formData.append("profile_image", profile_picture);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/update-profile-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("error", error);
    return redirect("/profile");
  }
};
