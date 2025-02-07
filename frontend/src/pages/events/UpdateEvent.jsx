import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { EventContext } from "../../contexts/EventContext";
import { updateEvent } from "../../controllers/eventsController";

export default function UpdateEvent() {
  // use Event Context
  const { events, setEvents } = useContext(EventContext);

  // Error State
  const [error, setError] = useState(null);

  // Use navigate hook
  const navigate = useNavigate();

  // Use location hook
  const { state } = useLocation();

  // Form data state
  const [formData, setFormData] = useState({
    title: state.title,
    body: state.body,
    date: state.date,
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

    try {
      // Update a post
      const data = await updateEvent(
        state._id,
        formData.title,
        formData.body,
        formData.date
      );
      // Update post state
      setEvents([...events, data.event]);
      // navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Update Event</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="input"
          value={formData.title}
          onChange={handleInput}
          autoFocus
        />
        <textarea
          name="body"
          placeholder="Content"
          className="input"
          rows="6"
          value={formData.body}
          onChange={handleInput}
        />
        <input
          type="text"
          name="date"
          placeholder="Event Date"
          className="input"
          value={formData.date}
          onChange={handleInput}
          autoFocus
        />
        <button className="btn" type="submit">
          Update
        </button>
      </form>

      {error && <p>Error: {error}</p>}
    </section>
  );
}
