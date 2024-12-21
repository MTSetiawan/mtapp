import { createPostAction } from "../../action/userPostsAction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/ReactToastify.css";

const CreatePost = () => {
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const request = {
      formData: () => formData,
    };
    try {
      const result = await createPostAction({ request });
      if (result.error) {
        throw new Error(result.error.message);
      } else {
        toast.success("Post Successfully!", {
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
      toast.error("Failed to post", {
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
      console.error("error post", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitPost} className="w-full flex gap-3">
        <input
          className="w-full p-3 input bg-gray-100 border shadow-lg text-black"
          name="contentPosts"
          id="contentPosts"
          placeholder="Post Something"
          required
        />
        <button className="btn btn-primary">Submit</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
