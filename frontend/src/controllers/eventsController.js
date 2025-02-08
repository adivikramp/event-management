/* --------------------------------------------- Get existing events --------------------------------------------- */
const getEvents = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/events`);
  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

/* --------------------------------------------- Get user's existing events --------------------------------------------- */
const getUserEvents = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/events/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

/* --------------------------------------------- Create new event --------------------------------------------- */
const createEvent = async (title, body, date, category, image) => {
  if (!title || !body || !date || !image || !category) {
    throw Error("all fields are required");
  }

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body, date, image, category }),
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

/* --------------------------------------------- Delete an event --------------------------------------------- */
const deleteEvent = async (_id) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/events/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

/* --------------------------------------------- Update an event --------------------------------------------- */
const updateEvent = async (_id, title, body, date, category) => {
  if (!title || !body || !date || !category) {
    throw Error("All fields are required");
  }

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/events/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body, date, category }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

export { getEvents, getUserEvents, createEvent, deleteEvent, updateEvent };
