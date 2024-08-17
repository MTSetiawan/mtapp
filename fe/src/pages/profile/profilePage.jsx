import { Form, Navigate, useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ProfilePage = () => {
  const data = useLoaderData();
  if (data?.error) return <Navigate to="/login" />;

  return (
    <div>
      <Navbar api={data} />
      <h1>ProfilePage</h1>
      <Form method="post" encType="multipart/form-data" action="/profile">
        <input type="file" name="profile_picture" required />
        <button type="submit">Update</button>
      </Form>
    </div>
  );
};

export default ProfilePage;
