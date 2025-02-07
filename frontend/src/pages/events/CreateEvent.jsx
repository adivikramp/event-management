import { useContext, useState } from "react";
import { createEvent } from "../../controllers/eventsController";
import { useNavigate } from "react-router";
import { EventContext } from "../../contexts/EventContext";

export default function CreateEvent() {
  // use Event Context
  const { events, setEvents } = useContext(EventContext);

  // Error State
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    date: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Formdata: ", formData);

    try {
      // Create new event
      const data = await createEvent(
        formData.title,
        formData.body,
        formData.date
      );
      // Update event state
      setEvents([...events, data.event]);
      // navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h1>Create Event</h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex justify-center items-center h-screen"
      >
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleInput}
          autoFocus
        />
        <textarea
          name="body"
          placeholder="Content"
          rows="6"
          value={formData.body}
          onChange={handleInput}
        />
        <input
          type="date"
          name="date"
          placeholder="Event Date"
          value={formData.date}
          onChange={handleInput}
          autoFocus
        />
        <button className="btn" type="submit">
          Create
        </button>
      </form>

      {error && <p>Error: {error}</p>}
    </section>
  );
}
