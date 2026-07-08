const express = require("express");
const router = express.Router();
const Event = require("../module/event");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const wrapAsync = require("../utils/wrapAsync");


// Get all events
router.get("/", wrapAsync(async (req, res) => {
  const allEvents = await Event.find({});
  res.json(allEvents);
}));


// Get single event
router.get("/:id", wrapAsync(async (req, res) => {
  const event = await Event.findById(req.params.id).populate("reviews");
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
}));

// Create event (Admin only)
router.post("/", requireAuth, requireAdmin, wrapAsync(async (req, res) => {
  const { title, description, price, location, country, date, image } =
    req.body;

  if (!title || !description || !price || !location || !country || !date) {
    return res
      .status(400)
      .json({ error: "Please provide all event details including date." });
  }

  const newEvent = new Event({
    title,
    description,
    price,
    location,
    country,
    date,
    image,
    createdBy: req.user._id,
  });

  await newEvent.save();
  res.status(201).json(newEvent);
}));

// Update event (Admin only)
router.put("/:id", requireAuth, requireAdmin, wrapAsync(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });

  if (event.createdBy.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ error: "You can only edit your own events" });
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true },
  );
  res.json(updatedEvent);
}));

// Delete event (Admin only)
router.delete("/:id", requireAuth, requireAdmin, wrapAsync(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });

  if (event.createdBy.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ error: "You can only delete your own events" });
  }

  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted successfully" });
}));


module.exports = router;