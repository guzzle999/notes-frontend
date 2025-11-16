import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";
  return (
    <nav className="bg-[#F3F4F6]/50 border-[#E5E7EB] px-8 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link
          to={user ? "/dashboard" : "/"}
          className="md:text-2xl font-extrabold text-black px-4 py-2  rounded-lg bg-[#B2F2BB] hover:bg-[#66ce74] transition"
        >
          📒 Notory
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {isAuthRoute ? (
          <>
            <Link
              to="/login"
              className="font-bold text-black bg-blue-200  rounded-lg px-3 py-1 hover:bg-blue-300 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="font-bold text-black bg-orange-200  rounded-lg px-3 py-1 hover:bg-orange-300 transition"
            >
              Signup
            </Link>
          </>
        ) : user ? (
          <>
            <h3 className="text-[#111827] px-3 py-1">
              {user.email}
            </h3>
            <Link
              to="/dashboard"
              className="font-bold text-black bg-[#B2F2BB]  rounded-lg px-3 py-1  hover:bg-pink-200 transition"
            >
              Dashboard
            </Link>
            <Link
              to={user && user._id ? `/profile/${user._id}` : "#"}
              className="font-bold text-black bg-[#FFD8A8] rounded-lg px-3 py-1  hover:bg-[#67b6f3] transition"
            >
              Profile
            </Link>
            <Link
              onClick={logout}
              className="font-bold text-black bg-[#D0BFFF] rounded-lg px-3 py-1  hover:bg-[#f571a4] transition"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="font-bold text-black bg-[#FFD8A8] rounded-lg px-3 py-1  hover:bg-[#f39c32] transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="font-bold text-black bg-[#FFC9DE] rounded-lg px-3 py-1  hover:bg-[#f06499] transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
