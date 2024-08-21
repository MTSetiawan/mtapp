import { useParams } from "react-router-dom";

import PopUpModal from "../../components/Profile/popUpModal";
import Navbar from "../../components/Navbar";
import CardPosts from "../../components/Posts/cardPosts";
import useProfilePage from "../../components/Profile/useProfilePage";

const ProfilePage = () => {
  const { userId } = useParams();
  const { profile, posts, error, loading, loggedInUserId } =
    useProfilePage(userId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  console.log({ posts });

  return (
    <div className="flex-grow p-4 min-h-screen bg-gray-200 ml-64">
      <Navbar api={posts} />
      <div className="text-black">
        <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-6">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
            <img
              src={profile?.profile_image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="text-center sm:text-left mt-4 sm:mt-0">
              <h1 className="text-2xl font-semibold">{profile?.username}</h1>
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
            {loggedInUserId === profile?.id && <PopUpModal />}
          </div>
        </div>

        <div className="mt-4 text-center sm:text-left">
          <p>Short bio or description about the user.</p>
          <a href="https://userwebsite.com" className="text-blue-500">
            userwebsite.com
          </a>
        </div>

        <CardPosts api={posts} useGrid={true} />
      </div>
    </div>
  );
};

export default ProfilePage;
