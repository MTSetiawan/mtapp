import { Navigate, useLoaderData } from "react-router-dom";
import CardPost from "../../components/Posts/cardPosts";
import Navbar from "../../components/Navbar";
import CreatePost from "../../components/Posts/createPost";

const DashboardPage = () => {
  const data = useLoaderData();
  if (data?.error) return <Navigate to="/login" />;
  return (
    <div className="flex-grow p-4 min-h-screen bg-gray-200 ml-64">
      <Navbar />
      <CreatePost />
      <div className="mt-4">
        <CardPost api={data} useGrid={false} />
      </div>
    </div>
  );
};

export default DashboardPage;
