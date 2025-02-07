const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

/* --------------------------------------------- Get existing Events --------------------------------------------- */
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: "desc" });
    res.status(200).json({ events });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

/* --------------------------------------------- Get user's existing Events --------------------------------------------- */
const getUserEvents = async (req, res) => {
  // Grab the authenticated user from request body
  const user = await User.findById(req.user._id);

  try {
    const userEvents = await Event.find({ user: user._id }).sort({
      createdAt: "desc",
    });
    res.status(200).json({ userEvents, email: user.email });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

/* --------------------------------------------- Create new Event --------------------------------------------- */
const newEvent = async (req, res) => {
  const { title, body, date } = req.body;

  // Check the fields are not empty
  if (!title || !body || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Grab the authenticated user from request body
  const user = await User.findById(req.user._id);

  try {
    const event = await Event.create({ title, body, date, user: user._id });
    res.status(200).json({ msg: "Post Call successful", event });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Post Call failed" });
  }
};

/* --------------------------------------------- Delete a Event --------------------------------------------- */
const deleteEvent = async (req, res) => {
  // Check if ID has a valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  //Check if events exist
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(400).json({ error: "Event not found" });
  }

  // Check the user owns the event
  const user = await User.findById(req.user._id);
  if (!event.user.equals(user._id)) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  try {
    await event.deleteOne();
    return res.status(200).json({ msg: "Event was deleted" });
  } catch (err) {
    console.log(err);
  }
};

/* --------------------------------------------- Update a Event --------------------------------------------- */
const updateEvent = async (req, res) => {
  // Grab the data
  const { title, body, date } = req.body;

  // Check the fields are not empty
  if (!title || !body || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // Check if event exists
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(400).json({ error: "Event not found" });
  }

  // Check the user owns the event
  const user = await User.findById(req.user._id);
  if (!event.user.equals(user._id)) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  try {
    await event.updateOne({ title, body, date });
    return res.status(200).json({ msg: "Event was updated" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getEvents,
  getUserEvents,
  newEvent,
  deleteEvent,
  updateEvent,
};
