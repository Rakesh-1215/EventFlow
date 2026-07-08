const express = require("express");
const router = express.Router();
const Ticket = require("../module/ticket");
const Event = require("../module/event");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../module/user");


// Book a ticket (Authenticated users)
router.post("/book", requireAuth, wrapAsync(async (req, res) => {
  const { eventId, password } = req.body;
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ error: "Event not found" });

  if (!password) {
    return res
      .status(400)
      .json({ error: "Please provide your password to confirm booking." });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ error: "Authenticated user not found" });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  // Check if user already booked
  const existingTicket = await Ticket.findOne({
    event: eventId,
    user: req.user._id,
  });
  if (existingTicket) {
    return res
      .status(400)
      .json({ error: "You have already booked a ticket for this event" });
  }

  const newTicket = new Ticket({
    event: event._id,
    user: req.user._id,
  });
  await newTicket.save();

  res.status(201).json(newTicket);
}));

// Get user's tickets (Authenticated users)
router.get("/my-tickets", requireAuth, wrapAsync(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id }).populate("event");
  res.json(tickets);
}));

// Validate ticket by code (Admin only)
router.post(
  "/validate",
  requireAuth,
  requireAdmin,
  wrapAsync(async (req, res) => {
    const { ticketCode } = req.body;
    const ticket = await Ticket.findOne({ ticketCode })
      .populate("event")
      .populate("user", "username email");

    if (!ticket)
      return res.status(404).json({ error: "Invalid Ticket Code" });

    if (ticket.event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: "You cannot validate tickets for an event you did not create",
        ticket,
      });
    }

    if (ticket.status === "validated") {
      return res
        .status(400)
        .json({ error: "Ticket has already been validated", ticket });
    }

    ticket.status = "validated";
    await ticket.save();

    res.json({ message: "Ticket validated successfully", ticket });
  })
);

module.exports = router;