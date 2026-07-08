const express = require("express");
const router = express.Router();
const Event = require("../module/event");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const wrapAsync = require("../utils/wrapAsync");



router.post("/", requireAuth, wrapAsync(async (req, res) => {

    const { eventId, rating, comment } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({
            error: "Event not found"
        });
    }

    // Create Review
    const review = new Review({
        rating,
        comment,
    });

    // Save Review
    await review.save();

    // Store review id inside event
    event.reviews.push(review._id);

    // Save Event
    await event.save();

    res.status(201).json({
        message: "Comment saved successfully"
    });

}));


module.exports = router;