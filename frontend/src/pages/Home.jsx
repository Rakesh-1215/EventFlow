import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../api";

const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/events`);
        setEvents(res.data);
      } catch (err) {
        toast.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 🔹 HERO SECTION */}
      <header className="py-20 px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
            Explore. Book. Attend.
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            The simplest way to <br />
            <span className="text-indigo-600">Discover Events</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Join thousands of people discovering local events, workshops, and
            concerts every day. All-in-one ticketing and management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/events")}
              className="text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg! text-sm px-10 py-3 text-center transition-all shadow-md border-none outline-none"
            >
              Explore Events
            </button>
          </div>
        </div>
      </header>

      {/* 🔹 FEATURED EVENTS SECTION */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Events
            </h2>
            <p className="text-gray-500 mt-1">
              Handpicked experiences you don't want to miss.
            </p>
          </div>
          <Link
            to="/events"
            className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            See all events <span>→</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">
              No events found yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Show only the first 3 or 6 events as 'featured' */}
            {events.slice(0, 3).map((event) => (
              <Link
                to={`/events/${event._id}`}
                key={event._id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Wrapper */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      event.image ||
                      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                    }
                    alt={event.title}
                    className="h-52 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Price Tag Overlay */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm font-bold text-indigo-600 text-sm">
                    {event.price > 0
                      ? `₹${event.price.toLocaleString("en-IN")}`
                      : "FREE"}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                      Featured
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date().toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {event.description ||
                      "Join us for this amazing event filled with networking, learning, and fun!"}
                  </p>

                  <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-medium">
                      Limited Seats
                    </span>
                    <span className="text-indigo-600 font-bold uppercase tracking-tight">
                      Book Now
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 🔹 CALL TO ACTION SECTION */}
      <section className="bg-indigo-600 py-16 px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Want to host your own event?
        </h2>
        <p className="mb-8 opacity-90">
          Set up your event page and start selling tickets in minutes.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-indigo-600 px-8 py-3  font-bold rounded-lg! hover:bg-indigo-50! transition-colors"
        >
          Get Started for Free
        </button>
      </section>
    </div>
  );
};

export default Home;
