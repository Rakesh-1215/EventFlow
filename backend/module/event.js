const mongoose = require("mongoose");
const Review = require("./review");

const schema = mongoose.Schema;

const eventSchema = new schema({
  title: {
    type: String,
    // required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
  },
  price: Number,
  date: {
    type: Date,
    required: true,
  },
  location: String,
  country: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
  reviews : [
    {
      type: schema.Types.ObjectId,
      ref : "Review",
    },
  ],
});


eventSchema.post("findOneAndDelete", async function (event) {
  if (event) {
    await  Review.deleteMany({_id:{ $in: event.reviews } });
  }
});


const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
