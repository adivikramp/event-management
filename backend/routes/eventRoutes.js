const express = require("express");
const router = express.Router();
const {
  getEvents,
  getUserEvents,
  newEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventsController");
const auth = require("../middlewares/authMiddleware");

// Get all events
router.get("/", getEvents);

// Get all user's events
router.get("/user", auth, getUserEvents);

// Add new event
router.post("/", auth, newEvent);

// Delete a event
router.delete("/:id", auth, deleteEvent);

// Update a event
router.put("/:id", auth, updateEvent);

module.exports = router;
