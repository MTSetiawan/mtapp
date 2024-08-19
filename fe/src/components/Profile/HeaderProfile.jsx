import PopUpModal from "./popUpModal";
import { getUserHooks } from "../../hooks/getUserHooks";

const HeaderProfile = () => {
  return (
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
  );
};

export default HeaderProfile;
