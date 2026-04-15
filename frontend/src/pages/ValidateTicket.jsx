import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ValidateTicket = () => {
  const [ticketCode, setTicketCode] = useState("");
  const [validatedData, setValidatedData] = useState(null);

  const handleValidate = async (e) => {
    e.preventDefault();
    setValidatedData(null);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/tickets/validate",
        { ticketCode },
      );
      setValidatedData(res.data.ticket);
      toast.success(res.data.message);
      setTicketCode("");
    } catch (err) {
      if (err.response?.data?.ticket) {
        setValidatedData(err.response.data.ticket);
        toast.warning(err.response.data.error || "Ticket is already validated");
      } else {
        toast.error(err.response?.data?.error || "Validation failed");
      }
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-6">
              Validate Attendee Ticket
            </h3>
            <form onSubmit={handleValidate}>
              <div className="flex mb-4">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-center"
                  placeholder="Enter Ticket Code (e.g., A1B2C3D4)"
                  value={ticketCode}
                  onChange={(e) => setTicketCode(e.target.value.toUpperCase())}
                  required
                />
                <button
                  className="bg-indigo-600 text-white px-6 py-3 rounded-r-md hover:bg-indigo-700 transition"
                  type="submit"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>

        {validatedData && (
          <div
            className={`p-4 rounded-lg! shadow-md mb-10 ${validatedData.status === "validated" ? "bg-yellow-100 border-l-4 border-yellow-500" : "bg-green-100 border-l-4 border-green-500"}`}
          >
            <h4 className="text-center font-bold mb-4">
              {validatedData.status === "validated"
                ? "Ticket Processed!"
                : "Valid Ticket!"}
            </h4>
            <hr className="mb-4" />
            <p className="mb-2">
              <strong>Event:</strong> {validatedData.event.title}
            </p>
            {validatedData.event.date && (
              <p className="mb-2">
                <strong>Event Date:</strong>{" "}
                {new Date(validatedData.event.date).toLocaleDateString(
                  "en-IN",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </p>
            )}
            <p className="mb-2">
              <strong>Attendee:</strong> {validatedData.user.username} (
              {validatedData.user.email})
            </p>
            <p className="mb-0">
              <strong>Current Status:</strong>{" "}
              <span className="uppercase font-bold">
                {validatedData.status}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateTicket;
