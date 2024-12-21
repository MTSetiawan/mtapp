// components/Navbar.js
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutAction } from "../action/userAction";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

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
        <Link to="/search" className="p-4 hover:bg-gray-200 Linky-700">
          Explore
        </Link>
        <Link to="/message" className="p-4 hover:bg-gray-200 Linky-700">
          Messages
        </Link>
        <Link to="#" className="p-4 hover:bg-gray-200 Linky-700">
          Notifications
        </Link>
        <Link
          to={`/profile/${user?.id}`}
          className="p-4 hover:bg-gray-200 Linky-700"
        >
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
