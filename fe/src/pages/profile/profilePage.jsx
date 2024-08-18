// src/pages/ProfilePage.js
import { Navigate, useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PopUpModal from "../../components/Profile/popUpModal";

const ProfilePage = () => {
  const data = useLoaderData();
  if (data?.error) return <Navigate to="/login" />;

  return (
    <div className="flex">
      <Navbar api={data} />
      <div className="flex-grow p-4 bg-base-200 ml-64">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={data.profile_image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-semibold">{data.username}</h1>
              <div className="flex space-x-4 mt-2">
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
          <button className="px-4 py-2 rounded-md text-sm font-semibold">
            <PopUpModal />
          </button>
        </div>

        {/* Bio Section */}
        <div className="mt-4">
          <p>Short bio or description about the user.</p>
          <a href="https://userwebsite.com" className="text-blue-500">
            userwebsite.com
          </a>
        </div>

        {/* Posts Grid */}
        <div className="mt-6 grid grid-cols-3 gap-2">
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
    </div>
  );
};

export default ProfilePage;
