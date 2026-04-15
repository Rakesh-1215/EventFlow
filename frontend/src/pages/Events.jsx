import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/events`); // ✅ FIXED
        console.log(res.data); // DEBUG
        setEvents(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-100 px-8 py-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        All Events
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link to={`/events/${event._id}`} key={event._id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition hover:-translate-y-2">
                <img
                  src={
                    event.image ||
                    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                  }
                  alt="event"
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {event.date
                      ? new Date(event.date).toLocaleDateString("en-IN", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Date not set"}
                  </p>
                  <p className="text-indigo-600 font-bold mt-2">
                    ₹{" "}
                    {event.price != null
                      ? event.price.toLocaleString("en-IN")
                      : "Free"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;


