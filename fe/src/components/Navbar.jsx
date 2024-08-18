import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white">
      <div className="p-4 text-xl font-bold">MtApp</div>
      <div className="flex flex-col flex-grow">
        <Link to="/dashboard" className="p-4 hover:bg-grLinky-700">
          Home
        </Link>
        <Link to="#" className="p-4 hover:bg-grLinky-700">
          Explore
        </Link>
        <Link to="#" className="p-4 hover:bg-grLinky-700">
          MessLinkges
        </Link>
        <Link to="#" className="p-4 hover:bg-grLinky-700">
          NotificLinktions
        </Link>
        <Link to="/profile" className="p-4 hover:bg-grLinky-700">
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
