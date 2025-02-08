/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { deleteEvent, getUserEvents } from "../../controllers/eventsController";
import { UserContext } from "../../contexts/UserContext";
import Event from "../../components/Event";
import { NavLink } from "react-router";
import { MdDelete, MdEdit } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Fetch user events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { userEvents, email } = await getUserEvents();
      setUser({ email, events: userEvents });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle delete event
  const handleDelete = async (_id) => {
    try {
      const data = await deleteEvent(_id);
      setSuccess(data.success);
      const newEvents = user.events.filter((event) => event._id !== _id);
      setUser({ ...user, events: newEvents });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsModalOpen(false);
    }
  };

  // Open confirmation modal
  const openDeleteModal = (_id) => {
    setEventToDelete(_id);
    setIsModalOpen(true);
  };

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
        <h1 className="text-4xl font-bold text-center mb-8">Your Events</h1>

        {/* Success and Error Messages */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
            <p>{success}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            <p>{error}</p>
          </div>
        )}

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {user.events && user.events.length > 0 ? (
            user.events.map((event) => (
              <div key={event._id} className="relative">
                <Event event={event} isButton={false}>
                  <div className="flex items-center gap-2">
                    <NavLink
                      className="text-green-500 transition-all duration-200 cursor-pointer hover:text-green-300"
                      title="Update"
                      state={event}
                      to="/update"
                    >
                      <MdEdit className="h-5 w-5" />
                    </NavLink>
                    <button
                      className="text-red-500 transition-all duration-200 cursor-pointer hover:text-red-300"
                      title="Delete"
                      onClick={() => openDeleteModal(event._id)}
                    >
                      <MdDelete className="h-5 w-5" />
                    </button>
                  </div>
                </Event>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No events found. Create a new event to get started!
            </p>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this event?"
          onConfirm={() => handleDelete(eventToDelete)}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
