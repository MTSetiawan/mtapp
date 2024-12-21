import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  potoProfileAction,
  UpdateUsernameAction,
} from "../../action/profileAction";

const UpdateProfile = () => {
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
      toast.error("Failed to update poto profile", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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
        toast.success("Update Usernam Succesfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (err) {
      toast.error("Update Username Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error("error update", err);
    }
  };

  return (
    <div className="">
      <div className="card card-body bg-gray-200">
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
            className="file-input file-input-bordered w-full max-w-xs bg-gray-300"
          />
          <button type="submit" className="btn btn-primary mt-3">
            Update
          </button>
        </form>
      </div>
      <div className="card card-body bg-gray-200 mt-3">
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
            className="input input-bordered w-full max-w-xs bg-gray-300"
          />
          <button type="submit" className="btn btn-primary mt-3">
            Update
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;
