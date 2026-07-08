require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const Event = require("./module/event");
const User = require("./module/user");
const Ticket = require("./module/ticket");
const Contact = require("./module/contact");
const Review = require("./module/review");
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

app.post("/api/auth/register", wrapAsync(async (req, res) => {
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
  }));

app.post("/api/auth/login", wrapAsync(async (req, res) => {
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

}));

//contact form submission data
// Contact Form API
app.post("/api/contact", wrapAsync(async (req, res) => {
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
}));

// --- EVENT ROUTES ---

app.use("/api/events", require("./routes/events"));

// --- Comment ROUTES ---
app.use("/api/comments", require("./routes/comment"));

// --- TICKET ROUTES ---
app.use("/api/tickets", require("./routes/tickets"));



app.use("/api/",(req,res,next)=>{
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).send(message);
}); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});