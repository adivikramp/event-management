import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { EventContext } from "../../contexts/EventContext";
import { updateEvent } from "../../controllers/eventsController";

export default function UpdateEvent() {
  const { events, setEvents } = useContext(EventContext);
  const eventCategories = [
    "Tech Event",
    "Food Event",
    "Music Concert",
    "Sports Event",
    "Other",
  ];

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  const formatDateForInput = (date) => {
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  // Form data state
  const [formData, setFormData] = useState({
    title: state.title || "",
    body: state.body || "",
    date: state.date ? formatDateForInput(state.date) : "",
    category: state.category || "",
  });

  useEffect(() => {
    setFormData({
      title: state.title || "",
      body: state.body || "",
      date: state.date ? formatDateForInput(state.date) : "",
      category: state.category || "",
    });
  }, [state]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateEvent(
        state._id,
        formData.title,
        formData.body,
        formData.date,
        formData.category
      );
      setEvents(
        events.map((event) => (event._id === state._id ? data.event : event))
      );
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="w-[400px] md:max-w-3xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg mt-40">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Event</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.title}
          onChange={handleInput}
          autoFocus
        />

        <textarea
          name="body"
          placeholder="Content"
          className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="2"
          value={formData.body}
          onChange={handleInput}
        />

        <input
          type="datetime-local"
          name="date"
          className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.date}
          onChange={handleInput}
        />

        <label className="block text-gray-400">Event Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInput}
          className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          {eventCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded text-white font-semibold"
          type="submit"
        >
          Update
        </button>
      </form>

      {error && <p className="text-red-500">Error: {error}</p>}
    </section>
  );
}
