import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../action/userAction";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAction();
    navigate("/login");
  };
  return (
    <div className="fixed top-0 left-0 w-64 min-h-screen bg-gray-100 text-black font-semibold">
      <div className="p-4 text-xl font-bold">MtApp</div>
      <div className="flex flex-col flex-grow">
        <Link to="/dashboard" className="p-4 hover:bg-gray-200 Linky-700">
          Home
        </Link>
        <Link to="#" className="p-4 hover:bg-gray-200 Linky-700">
          Explore
        </Link>
        <Link to="#" className="p-4 hover:bg-gray-200 Linky-700">
          MessLinkges
        </Link>
        <Link to="#" className="p-4 hover:bg-gray-200 Linky-700">
          NotificLinktions
        </Link>
        <Link to="/profile" className="p-4 hover:bg-gray-200 Linky-700">
          Profile
        </Link>
        <Link
          onClick={handleLogout}
          className="font-bold p-4 text-red-600 hover:bg-red-600 hover:text-white"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
