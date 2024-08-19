import { Navigate, useLoaderData } from "react-router-dom";
import PopUpModal from "../../components/Profile/popUpModal";
import Navbar from "../../components/Navbar";

const ProfilePage = () => {
  const data = useLoaderData();
  if (data?.error) return <Navigate to="/login" />;

  return (
    <div className="flex-grow p-4 min-h-screen bg-gray-200 ml-64">
      <Navbar />
      <div className="text-black">
        <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-6">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
            <img
              src={data.profile_image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="text-center sm:text-left mt-4 sm:mt-0">
              <h1 className="text-2xl font-semibold">{data.username}</h1>
              <div className="flex justify-center sm:justify-start space-x-4 mt-2">
                <div className="text-center">
                  <span className="block font-bold">24</span>
                  <span>Posts</span>
                </div>
                <div className="text-center">
                  <span className="block font-bold">1000</span>
                  <span>Followers</span>
                </div>
                <div className="text-center">
                  <span className="block font-bold">300</span>
                  <span>Following</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <PopUpModal />
          </div>
        </div>

        <div className="mt-4 text-center sm:text-left">
          <p>Short bio or description about the user.</p>
          <a href="https://userwebsite.com" className="text-blue-500">
            userwebsite.com
          </a>
        </div>

        {/* Posts Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {/* Replace with actual posts */}
          <div className="aspect-square bg-gray-300"></div>
          <div className="aspect-square bg-gray-300"></div>
          <div className="aspect-square bg-gray-300"></div>
          <div className="aspect-square bg-gray-300"></div>
          <div className="aspect-square bg-gray-300"></div>
          <div className="aspect-square bg-gray-300"></div>
          <div className="aspect-square bg-gray-300"></div>
          <div className="aspect-square bg-gray-300"></div>
          <div className="aspect-square bg-gray-300"></div>
        </div>
      </div>
      ;
    </div>
  );
};

export default ProfilePage;
