import { useContext, useState } from "react";
import { MdEventNote } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { loginUser } from "../../controllers/usersController";

const Login = () => {
  const { setUser } = useContext(UserContext);

  // Use navigate Hook
  const navigate = useNavigate();

  //Error State
  const [error, setError] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  // Handle Login
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Login the user
      await loginUser(formData.email, formData.password);
      // Update the user state
      setUser({ email: formData.email, events: [] });
      // Navigate to dashboard
      navigate("/events");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="min-h-screen bg-black flex flex-col justify-center items-center">
      <div
        className="mx-auto w-[360px] md:w-[480px] flex flex-col rounded-2xl py-6 px-10"
        style={{ boxShadow: "0 4px 28px rgba(255, 255, 255, 0.4)" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex items-center">
              <MdEventNote className="text-white h-12 w-12" />
              <h1 className="text-white font-bold text-3xl mx-4">Sign in</h1>
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
            </div>
            <button className="bg-white font-bold py-3 rounded-xl cursor-pointer">
              Login
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 my-4 text-center ">{error}</p>}
      </div>
      <p className="text-gray-500 text-center mt-4">
        Do not have an account?
        <NavLink to="/signup" className="text-white">
          {" "}
          Sign up
        </NavLink>
      </p>
    </section>
  );
};

export default Login;
