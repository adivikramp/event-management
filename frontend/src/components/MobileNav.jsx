import { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdEventNote } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";

const MobileNav = () => {
  const [navOpen, setNavOpen] = useState(false);

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

  return (
    <>
      <div className="block md:hidden" onClick={() => setNavOpen(!navOpen)}>
        {navOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {navOpen && (
        <div className="fixed flex flex-col md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500">
          <NavLink to="/">
            <MdEventNote className="text-white h-12 w-12 m-4 cursor-pointer" />
          </NavLink>
          {user.email ? (
            <>
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
                className="text-left px-4 py-2 rounded-xl m-2 cursor-pointer duration-300 hover:bg-blue-500"
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
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MobileNav;
