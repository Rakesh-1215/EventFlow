import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../api";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const { user } = useContext(AuthContext);

  // Comment section states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Added
  const [error, setError] = useState(null); // ✅ Added
  const [success, setSuccess] = useState(false); // ✅ Added

  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      toast.error("Failed to load event. Check if the ID is correct!");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  // Comment handling
  const handleRatingChange = (e) => {
    const value = parseInt(e.target.value);
    setRating(value);
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    // Validation
    if (!comment.trim()) {
      setError('Please write a comment');
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (comment.trim().length < 10) {
      setError('Comment must be at least 10 characters');
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Prepare data
    const commentData = {
      eventId: id,
      rating,
      comment: comment.trim(),
    };

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      // ✅ Using axios (consistent with your other API calls)
      const response = await axios.post(
        `${API_BASE_URL}/api/comments`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      // Success
      setSuccess(true);
      toast.success('Comment submitted successfully!'); // ✅ Using toast for feedback

      // Reset form
      setRating(5);
      setComment('');

      // Auto-hide success
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit comment';
      setError(errorMessage);
      toast.error(errorMessage); // ✅ Using toast for error feedback
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
      await fetchEvent();
    }
  };

  const handleBook = () => {
    if (!user) {
      toast.warning("Please login to book a ticket");
      return navigate("/login");
    }
    setBookingError("");
    setShowConfirm(true);
  };

  const handleConfirmBooking = async () => {
    if (!password.trim()) {
      setBookingError("Please enter your password to confirm booking.");
      return;
    }

    setBookingLoading(true);
    setBookingError("");

    try {
      await axios.post(`${API_BASE_URL}/api/tickets/book`, {
        eventId: id,
        password,
      });
      toast.success("Ticket booked successfully!");
      navigate("/my-tickets");
    } catch (err) {
      setBookingError(err.response?.data?.error || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleCancelBooking = () => {
    setShowConfirm(false);
    setPassword("");
    setBookingError("");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/events/${id}`);
        toast.success("Event deleted");
        navigate("/");
      } catch (err) {
        toast.error("Failed to delete event");
      }
    }
  };

  if (!event) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="w-full max-w-3xl mx-auto space-y-6">
        {/* Event Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Event Banner Image */}
          <div className="relative h-80">
            <img
              src={
                event.image ||
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
              }
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-white/90 backdrop-blur-sm text-indigo-700 px-4 py-2 rounded-lg font-bold shadow-md">
                ₹
                {event.price != null
                  ? event.price.toLocaleString("en-IN")
                  : "Free"}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                {event.title}
              </h1>
              <div className="space-y-2">
                <div className="flex items-center text-gray-500 text-sm">
                  <i className="fas fa-location-dot mr-2 text-indigo-500"></i>
                  {event.location}, {event.country}
                </div>
                {event.date && (
                  <div className="flex items-center text-gray-500 text-sm">
                    <i className="fas fa-calendar mr-2 text-indigo-500"></i>
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
            </div>

            <hr className="mb-6 border-gray-100" />

            <div className="mb-8">
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Description
              </h4>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between gap-4 border-t pt-8">
              <button
                onClick={() => navigate(-1)}
                className="text-gray-500 hover:text-gray-800 font-medium transition"
              >
                <i className="fas fa-arrow-left mr-2"></i> Go Back
              </button>

              <div className="flex flex-col gap-4">
                {(!user || user.role === "attendee") && (
                  <button
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl! font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 active:scale-95"
                    onClick={handleBook}
                  >
                    Book Now
                  </button>
                )}

                {showConfirm && (
                  <div className="bg-gray-50 border border-indigo-100 rounded-2xl p-5 space-y-4">
                    <p className="text-sm text-gray-700">
                      Please confirm your password to complete the booking.
                    </p>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                    {bookingError && (
                      <p className="text-sm text-red-600">{bookingError}</p>
                    )}
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={bookingLoading}
                        onClick={handleConfirmBooking}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl! mt-3 font-bold hover:bg-indigo-700 transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {bookingLoading ? "Confirming..." : "Confirm Booking"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelBooking}
                        className="bg-white text-gray-700 px-6 py-3 rounded-xl! mt-3 font-semibold border border-gray-200 hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {user && user.role === "admin" && event.createdBy === user.id && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/events/${id}/edit`)}
                      className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-xl! font-bold hover:bg-emerald-600 hover:text-white transition border border-emerald-100 active:scale-95"
                    >
                      <i className="fas fa-edit mr-2"></i> Edit Event
                    </button>
                    <button
                      className="bg-red-50 text-red-600 px-6 py-3 rounded-xl! font-bold hover:bg-red-600 hover:text-white transition border border-red-100"
                      onClick={handleDelete}
                    >
                      Delete Event
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Comment Form - Below Event Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Leave a Comment</h2>

          {/* Status Messages */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-200">
              Comment submitted successfully!
            </div>
          )}



          <form className="space-y-6" onSubmit={handleSubmitComment}>
            {/* Rating Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={rating}
                  onChange={handleRatingChange}
                  disabled={isLoading}
                  className="w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50"
                />
                <span className="min-w-[3rem] px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-lg text-center">
                  {rating}
                </span>
              </div>

              {/* Star Rating Display */}
              <div className="flex items-center mt-2 space-x-1 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Comment Textarea */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Your Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                value={comment}
                onChange={handleCommentChange}
                disabled={isLoading}
                placeholder="Write your thoughts here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y disabled:opacity-50"
              ></textarea>
              <div className="mt-1 text-xs text-gray-500 text-right">
                {comment.length}/500
              </div>

              {error && (
                <div className="text-red-700">
                  {error}
                </div>
              )}

            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <button
                type="reset"
                // Add mr-4 here directly
                className="mr-4 px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 !rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors disabled:opacity-50"
                onClick={() => {
                  setComment('');
                  setRating(5);
                  setError(null);
                  setSuccess(false);
                }}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 !rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-50 flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Comment'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              {event.reviews.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                event.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border rounded-lg p-4 mb-4"
                  >
                    <p className="font-semibold">
                      Rating: ⭐ {review.rating}/5
                    </p>

                    <p className="break-words whitespace-pre-wrap text-gray-700">
                      {review.comment}
                    </p>

                    <small>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                ))
              )}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;