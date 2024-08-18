import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { potoProfileAction } from "../../action/profileAction";

const UpdatePotoProfile = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const request = {
      formData: () => formData,
    };

    try {
      const result = await potoProfileAction({ request });
      if (result instanceof Response) {
        navigate(result.url);
      }
    } catch (err) {
      setError("Failed to update profile picture.");
      console.error("Error updating profile picture:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="profile_picture" required />
        <button type="submit">Update</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdatePotoProfile;
