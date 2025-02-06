import { Navlink } from "react-router";

const Homepage = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-36">
      <section className="w-4/5 mx-auto">
        <section className="flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl font-bold mb-4">
            Revolutionize Conversations with AI
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Integrate our chatbot seamlessly into your website to enhance user
            engagement and automate responses with AI-driven technology.
          </p>
          <div className="mt-6 flex space-x-4">
            <Navlink
              to="/signup"
              className="bg-blue-500 px-6 py-3 rounded-lg text-sm md:text-lg font-semibold hover:bg-blue-600 transition"
            >
              Get Started
            </Navlink>
            <Navlink
              to="/features"
              className="border border-gray-600 px-6 py-3 rounded-lg text-sm md:text-lg font-semibold hover:bg-gray-800 transition"
            >
              Learn More
            </Navlink>
          </div>
        </section>

        <section className="py-20 px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Why Choose Our Event Management Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                Effortless Planning
              </h3>
              <p className="text-gray-400">
                Organize your events seamlessly with our easy-to-use planning
                tools.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                Real-Time Collaboration
              </h3>
              <p className="text-gray-400">
                Collaborate with your team and vendors in real-time to ensure
                everything runs smoothly.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                Customizable Solutions
              </h3>
              <p className="text-gray-400">
                Customize your events to reflect your unique vision and
                requirements.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Homepage;
