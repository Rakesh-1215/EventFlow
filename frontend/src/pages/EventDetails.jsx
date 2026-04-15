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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        toast.error("Failed to load event. Check if the ID is correct!");
      }
    };
    fetchEvent();
  }, [id]);

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
    <div className="container mx-auto px-4 py-10 flex justify-center">
      {/* Main Single Card Container */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                <button
                  className="bg-red-50 text-red-600 px-6 py-3 rounded-xl! font-bold hover:bg-red-600 hover:text-white transition border border-red-100"
                  onClick={handleDelete}
                >
                  Delete Event
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
