import { useContext, useState } from "react";
import { registerUser } from "../../controllers/usersController";
import { NavLink, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { MdEventNote } from "react-icons/md";

const Register = () => {
  // Use User Context
  const { setUser } = useContext(UserContext);

  // Use navigate Hook
  const navigate = useNavigate();

  //Error State
  const [error, setError] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input
  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Register the user
      await registerUser(
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      // Update the user state
      setUser({
        email: formData.email,
        events: [],
      });
      // Navigate to events
      navigate("/events");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="min-h-screen bg-black flex flex-col justify-center items-center pt-16">
      <div
        className="mx-auto w-[360px] md:w-[480px] flex flex-col rounded-2xl py-6 px-10"
        style={{ boxShadow: "0 4px 28px rgba(255, 255, 255, 0.4)" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex items-center">
              <MdEventNote className="text-white h-12 w-12" />
              <h1 className="text-white font-bold text-3xl mx-4">Register</h1>
            </div>
            <div className="grid grid-cols-1 w-full items-center gap-y-4 my-6">
              <label className="text-gray-400 text-sm" htmlFor="email">
                Email
              </label>
              <input
                className="border border-gray-800 text-white p-2 rounded-lg"
                type="email"
                id="email"
                name="email"
                placeholder="name@work-email.com"
                onChange={handleInput}
                required
              />
              <label className="text-gray-400 text-sm" htmlFor="password">
                Password
              </label>
              <input
                className="border border-gray-800 text-white p-2 rounded-lg"
                type="password"
                id="password"
                name="password"
                placeholder="Your Password"
                onChange={handleInput}
                required
              />
              <label className="text-gray-400 text-sm" htmlFor="password">
                Confirm Password
              </label>
              <input
                className="border border-gray-800 text-white p-2 rounded-lg"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleInput}
                value={formData.confirmPassword}
                required
              />
            </div>
            <button className="bg-white font-bold py-3 rounded-xl cursor-pointer">
              Sign Up
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 my-4 text-center ">{error}</p>}
      </div>
      <p className="text-gray-500 text-center mt-4">
        Have an account?
        <NavLink to="/login" className="text-white">
          {" "}
          Sign In
        </NavLink>
      </p>
    </section>
  );
};

export default Register;
