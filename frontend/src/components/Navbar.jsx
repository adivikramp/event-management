import { useContext, useEffect, useState } from "react";
import { MdEventNote } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
import MobileNav from "./MobileNav";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Confirm Logout")) {
      setUser({ email: null, events: [] });
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      navigate("/");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-black flex justify-between items-center h-20 px-4 text-white z-20">
      <div className="w-full md:w-4/5 flex justify-between items-center mx-auto">
        {/* Logo */}
        <NavLink to="/">
          <MdEventNote className="text-white h-10 w-10 cursor-pointer" />
        </NavLink>

        {/* Desktop Navigation */}
        {isDesktop ? (
          <div className="hidden md:flex">
            {user.email ? (
              <>
                <NavLink
                  to="/events"
                  className="px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:bg-blue-500"
                >
                  Event List
                </NavLink>
                <NavLink
                  to="/create-event"
                  className="px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:bg-blue-500"
                >
                  Create Event
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className="px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:bg-blue-500"
                >
                  User Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:bg-blue-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:bg-blue-500"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:bg-blue-500"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        ) : (
          <MobileNav />
        )}
      </div>
    </div>
  );
};

export default Navbar;
