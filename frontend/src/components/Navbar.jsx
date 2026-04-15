import { useContext, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Menu, X, User as UserIcon } from "lucide-react"; // User icon add kiya

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
    setIsOpen(false);
  };

  const navStyle = ({ isActive }) =>
    `relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
      isActive
        ? "bg-indigo-50 text-indigo-600 shadow-sm"
        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
    } md:w-auto w-full text-center`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 🔹 Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-linear-to-br from-blue-500 to-purple-600 text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold shadow-lg group-hover:scale-105 transition-transform">
            EF
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            Event<span className="text-indigo-600">Flow</span>
          </span>
        </Link>

        {/* 🔹 Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>
          <NavLink to="/events" className={navStyle}>
            All Events
          </NavLink>
          {user?.role === "attendee" && (
            <NavLink to="/my-tickets" className={navStyle}>
              My Tickets
            </NavLink>
          )}
          {user?.role === "admin" && (
            <>
              <NavLink to="/admin/events/new" className={navStyle}>
                Add Event
              </NavLink>
              <NavLink to="/admin/validate" className={navStyle}>
                Validate
              </NavLink>
            </>
          )}
        </div>

        {/* 🔹 Action Section & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-5">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-bold"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* 🔹 User Info (Desktop) */}
                <div className="flex flex-col items-end leading-tight">
                  <span className="text-sm font-bold text-gray-900 capitalize">
                    {user.username}
                  </span>
                  <span className="text-[10px] font-medium text-indigo-500 uppercase tracking-wider">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* 📱 Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-3 shadow-xl animate-in fade-in slide-in-from-top-2">
          {/* 🔹 User Info (Mobile Only) */}
          {user && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-2">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full">
                <UserIcon size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 capitalize">
                  {user.username}
                </span>
                <span className="text-xs text-gray-500 uppercase">
                  {user.role}
                </span>
              </div>
            </div>
          )}

          <NavLink to="/" className={navStyle} onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={navStyle}
            onClick={() => setIsOpen(false)}
          >
            All Events
          </NavLink>

          {!user ? (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                className="py-2 text-center font-bold"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white py-3 rounded-xl text-center font-bold"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-500 font-bold py-3 bg-red-50 rounded-xl mt-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
