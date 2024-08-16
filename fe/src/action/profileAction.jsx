import axios from "axios";

export const potoProfileAction = async ({ request }) => {
  const form = await request.formData();

  const profile_picture = form.get("profile_picture");
  const userId = form.get("userId");

  const formData = new FormData();
  formData.append("profile_image", profile_picture);
  formData.append("userId", userId);

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}api/users/update-profile-image`,
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
    console.error("Error uploading profile picture:", error);
    return { error: "Failed to upload profile picture." };
  }
};
