/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { getEvents } from "../../controllers/eventsController";
import { EventContext } from "../../contexts/EventContext";
import Event from "../../components/Event";
import { ThreeDots } from "react-loader-spinner";

const eventCategories = [
  "Tech Event",
  "Food Event",
  "Music Concert",
  "Sports Event",
  "Other",
];

export default function EventList() {
  const { events, setEvents } = useContext(EventContext);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const data = await getEvents();
      setEvents(data.events);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <section className="pt-32 pb-16">
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ThreeDots
            visible={true}
            height="120"
            width="120"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      )}

      <div className="w-4/5 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Upcoming Events</h1>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          {eventCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Event key={event._id} event={event} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No events found in this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
