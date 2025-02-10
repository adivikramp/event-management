import { NavLink } from "react-router";

const Homepage = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-36">
      <section className="w-4/5 mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl font-bold mb-4">
            Effortless Event Planning & Management
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Plan, organize, and manage events seamlessly with our all-in-one
            platform. From ticketing to guest management, we have got you
            covered.
          </p>
          <div className="mt-6 flex space-x-4">
            <NavLink
              to="/create-event"
              className="bg-blue-500 px-6 py-3 rounded-lg text-sm md:text-lg font-semibold hover:bg-blue-600 transition"
            >
              Create an Event
            </NavLink>
            <NavLink
              to="/events"
              className="border border-gray-600 px-6 py-3 rounded-lg text-sm md:text-lg font-semibold hover:bg-gray-800 transition"
            >
              See Events
            </NavLink>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Why Choose Our Event Management Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Create Event</h3>
              <p className="text-gray-400">
                Easily set up and customize events with our intuitive event
                creation tools.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">See Events</h3>
              <p className="text-gray-400">
                Browse and explore upcoming events seamlessly in one place.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Secure Login</h3>
              <p className="text-gray-400">
                Access your account securely with advanced authentication
                methods.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Homepage;
