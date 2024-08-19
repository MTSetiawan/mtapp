import { useState } from "react";
import { createPostAction } from "../../action/userPostsAction";

const CreatePost = () => {
  const [succesMessage, setSuccesMessage] = useState(null);
  const [error, setError] = useState(null);

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
        setSuccesMessage("Posts Succesfully");
      }
    } catch (err) {
      setError("Failed to post");
      console.error("error post", err);
    }
  };
  return (
    <form onSubmit={handleSubmitPost} className="w-full flex gap-3">
      <input
        className="w-full p-3 input bg-gray-100 border shadow-lg"
        name="contentPosts"
        id="contentPosts"
        placeholder="Post Something"
      />
      <button className="btn btn-primary">Submit</button>
      {error && <p>{error}</p>}
      {succesMessage && <p style={{ color: "green" }}>{succesMessage}</p>}
    </form>
  );
};

export default CreatePost;
