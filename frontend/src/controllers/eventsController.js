/* --------------------------------------------- Get existing events --------------------------------------------- */
const getEvents = async () => {
  const response = await fetch("http://localhost:8000/api/events");
  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

/* --------------------------------------------- Get user's existing events --------------------------------------------- */
const getUserEvents = async () => {
  const response = await fetch("http://localhost:8000/api/events/user", {
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
const createEvent = async (title, body, date) => {
  if (!title || !body || !date) {
    throw Error("all fields are required");
  }

  const response = await fetch("http://localhost:8000/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body, date }),
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

/* --------------------------------------------- Delete a event --------------------------------------------- */
const deleteEvent = async (_id) => {
  const response = await fetch(`http://localhost:8000/api/events/${_id}`, {
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
const updateEvent = async (_id, title, body, date) => {
  if (!title || !body || !date) {
    throw Error("All fields are required");
  }

  const response = await fetch(`http://localhost:8000/api/events/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body, date }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

export { getEvents, getUserEvents, createEvent, deleteEvent, updateEvent };
