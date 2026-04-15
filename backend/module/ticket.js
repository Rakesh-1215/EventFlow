const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["booked", "validated"],
    default: "booked"
  },
  ticketCode: {
    type: String,
    unique: true,
    default: () => uuidv4().slice(0, 8).toUpperCase()
  }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);
