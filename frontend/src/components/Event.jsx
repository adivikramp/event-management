/* eslint-disable react/prop-types */
const categoryColors = {
  "Tech Event": "bg-blue-500",
  "Food Event": "bg-green-500",
  "Music Concert": "bg-purple-500",
  "Sports Event": "bg-red-500",
  Other: "bg-yellow-500",
};

export default function Event({ event, children, isButton = false }) {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div className="relative">
          <img
            className="w-full h-64 object-cover"
            src={event.image}
            alt={event.title}
          />
          {children && (
            <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
              {children}
            </div>
          )}
          {/* Dynamic Category Color */}
          <div
            className={`absolute top-0 right-0 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold ${
              categoryColors[event.category] || "bg-gray-500"
            }`}
          >
            {event.category}
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            {event.title}
          </h2>
          <p className="text-gray-600 mb-4">{event.body}</p>
          <div className="flex items-center mb-4">
            <span className="text-gray-600 font-bold">
              {new Date(event.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}{" "}
              at{" "}
              {new Date(event.date).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
          {isButton && (
            <div className="flex justify-between items-center">
              <button className="cursor-pointer px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
