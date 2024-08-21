import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  potoProfileAction,
  UpdateUsernameAction,
} from "../../action/profileAction";

const UpdateProfile = () => {
  const [error, setError] = useState(null);
  const [succesMessage, setSuccesMessage] = useState(null);
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

  // Update Username
  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const request = {
      formData: () => formData,
    };

    try {
      const result = await UpdateUsernameAction({ request });
      if (result.error) {
        throw new Error(result.error.message);
      } else {
        setSuccesMessage("Username Update Succesfully");
      }
    } catch (err) {
      setError("Failed to Update");
      console.error("error update", err);
    }
  };

  return (
    <div className="">
      <div className="card card-body bg-base-300">
        <h1 className="text-xl">Update Poto Profile</h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col items-center justify-center mt-3"
        >
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            required
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary mt-3">
            Update
          </button>
        </form>
      </div>
      <div className="card card-body bg-base-300 mt-3">
        <h1 className="text-xl">Update Username</h1>
        <form
          onSubmit={handleUsernameSubmit}
          className="flex flex-col items-center justify-center mt-3"
        >
          <input
            type="text"
            id="newUsername"
            name="newUsername"
            placeholder="Update Username"
            required
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary mt-3">
            Update
          </button>
        </form>
      </div>
      {error && <p>{error}</p>}
      {succesMessage && <p style={{ color: "green" }}>{succesMessage}</p>}
    </div>
  );
};

export default UpdateProfile;
