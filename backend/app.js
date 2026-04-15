require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");

const Event = require("./module/event");
const User = require("./module/user");
const Ticket = require("./module/ticket");
const Contact = require("./module/contact");
const { requireAuth, requireAdmin, JWT_SECRET } = require("./middleware/auth");

const app = express();

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/eventApp";
const PORT = process.env.PORT || 8080;
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to database");
}

main().catch((err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.length === 0 ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- AUTHENTICATION ROUTES ---

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    const newUser = new User({ username, email, password, role });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1d" },
    );
    res
      .status(201)
      .json({ user: { id: newUser._id, username, email, role }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//contact form submission data
// Contact Form API
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation: Check karein ki koi field khali na ho
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    // Naya contact message create karein
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Database mein save karein
    await newContact.save();

    res.status(201).json({
      message: "Message sent successfully! We will contact you soon.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- EVENT ROUTES ---

// Get all events
app.get("/api/events", async (req, res) => {
  try {
    const allEvents = await Event.find({});
    res.json(allEvents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single event
app.get("/api/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create event (Admin only)
app.post("/api/events", requireAuth, requireAdmin, async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update event (Admin only)
app.put("/api/events/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete event (Admin only)
app.delete("/api/events/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You can only delete your own events" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- TICKET ROUTES ---

// Book a ticket (Authenticated users)
app.post("/api/tickets/book", requireAuth, async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's tickets (Authenticated users)
app.get("/api/tickets/my-tickets", requireAuth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).populate("event");
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Validate ticket by code (Admin only)
app.post(
  "/api/tickets/validate",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
