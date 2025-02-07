/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { deleteEvent, getUserEvents } from "../../controllers/eventsController";
import { UserContext } from "../../contexts/UserContext";
import Event from "../../components/Event";
import { NavLink } from "react-router";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Dashboard() {
  // Use User Context
  const { user, setUser } = useContext(UserContext);

  console.log(user);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState(null);

  // Success state
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const { userEvents, email } = await getUserEvents();
      setUser({ email, events: userEvents });
      setLoading(false);
    }, 1000);
  }, []);

  // Handle delete event
  const handleDelete = async (_id) => {
    try {
      confirm("Do you want to delete ?");
      // Delete the event
      const data = await deleteEvent(_id);
      setSuccess(data.success);
    } catch (error) {
      setError(error.message);
    }

    const newEvents = user.events.filter((event) => event._id !== _id);
    setUser({ ...user, events: newEvents });
  };

  return (
    <section>
      <p className="text-xl font-bold m-4">{user.email}</p>
      <h1 className="text-4xl font-bold m-4">User Dashboard</h1>

      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}

      <div className="flex w-full flex-wrap">
        {user.events &&
          user.events.map((event) => (
            <div className="flex w-1/5 m-2 h-60" key={event._id}>
              <Event event={event}>
                <div className="flex items-center gap-2">
                  <NavLink
                    className="text-green-500 transition-all duration-200 cursor-pointer hover:text-green-200"
                    title="Update"
                    state={event}
                    to="/update"
                  >
                    <MdEdit className="h-6 w-6" />
                  </NavLink>
                  <button
                    className="text-red-500 transition-all duration-200 cursor-pointer hover:text-red-200"
                    title="Delete"
                    onClick={() => handleDelete(event._id)}
                  >
                    <MdDelete className="h-6 w-6" />
                  </button>
                </div>
              </Event>
            </div>
          ))}
      </div>
    </section>
  );
}
