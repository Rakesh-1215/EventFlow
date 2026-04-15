import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/tickets/my-tickets",
        );
        setTickets(res.data);
      } catch (err) {
        toast.error("Failed to load your tickets");
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          My Booked Tickets
        </h3>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
          {tickets.length} {tickets.length === 1 ? "Ticket" : "Tickets"}
        </span>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="text-gray-400 mb-4">
            <i className="fas fa-ticket-alt text-5xl"></i>
          </div>
          <p className="text-xl text-gray-600">
            You have not booked any tickets yet.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
          >
            Find exciting events →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tickets.map((t) => (
            <div
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col sm:flex-row"
              key={t._id}
            >
              {/* Left Section: Status & Code (Visual "Stub") */}
              <div
                className={`sm:w-1/3 p-6 flex flex-col justify-center items-center text-white transition-colors duration-300 ${
                  t.status === "booked"
                    ? "bg-indigo-600 group-hover:bg-indigo-700"
                    : "bg-emerald-600 group-hover:bg-emerald-700"
                }`}
              >
                <span className="text-xs uppercase tracking-widest opacity-80 mb-1">
                  Status
                </span>
                <span className="text-lg font-black mb-4 tracking-wider">
                  {t.status.toUpperCase()}
                </span>
                <div className="w-full border-t border-white/20 my-2"></div>
                <span className="text-xs uppercase tracking-widest opacity-80 mt-2">
                  Code
                </span>
                <span className="font-mono font-bold text-lg">
                  {t.ticketCode}
                </span>
              </div>

              {/* Right Section: Event Details */}
              <div className="sm:w-2/3 p-6 relative bg-white">
                {/* Decorative "Ticket Notch" for desktop */}
                <div className="hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-gray-50 rounded-full border-r border-gray-100"></div>

                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h5 className="text-2xl font-bold text-gray-800 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                      {t.event.title}
                    </h5>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-500">
                        <i className="fas fa-location-dot w-5 text-indigo-500"></i>
                        <span className="text-sm font-medium">
                          {t.event.location}, {t.event.country},
                        </span>
                        <br></br>
                        <div>
                          {t.event.date && (
                            <div className="flex items-center text-gray-500 text-sm">
                              <i className="fas fa-calendar mr-2 text-indigo-500"></i>
                              {new Date(t.event.date).toLocaleDateString(
                                "en-IN",
                                {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                },
                              )}
                            </div>
                          )}
                        </div>
                      </p>
                      {/* Adding a placeholder for date if you have it in your data */}
                      <p className="flex items-center text-gray-500">
                        <i className="far fa-calendar w-5 text-indigo-500"></i>
                        <span className="text-sm">Confirmed Booking</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Link
                      // Change t._id to t.event._id (or whatever your event ID field is called)
                      to={`/events/${t.event._id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-indigo-600 text-sm font-bold rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                      View Details
                      <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
