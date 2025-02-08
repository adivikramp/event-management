import { useContext, useState } from "react";
import { createEvent } from "../../controllers/eventsController";
import { useNavigate } from "react-router";
import { EventContext } from "../../contexts/EventContext";

export default function CreateEvent() {
  const { events, setEvents } = useContext(EventContext);
  const eventCategories = [
    "Tech Event",
    "Food Event",
    "Music Concert",
    "Sports Event",
    "Other",
  ];

  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    date: "",
    image: "",
    category: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "event_management");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_KEY
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
    } catch (err) {
      console.log(err);
      setError("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createEvent(
        formData.title,
        formData.body,
        formData.date,
        formData.category,
        formData.image
      );
      setEvents([...events, data.event]);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="w-[400px] md:max-w-4xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg mt-32">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Event</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleInput}
            className="p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="body"
            placeholder="Event Description"
            rows="4"
            value={formData.body}
            onChange={handleInput}
            className="p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleInput}
            className="p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleInput}
            className="p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
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
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded text-white font-semibold"
          >
            Create Event
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="flex flex-col items-center gap-4">
          <label className="block text-gray-400">Upload Event Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
          />
          {uploading && <p className="text-blue-400">Uploading image...</p>}
          {formData.image && (
            <img
              src={formData.image}
              alt="Event"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>
      </form>
    </section>
  );
}
