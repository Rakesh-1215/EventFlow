import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import ValidateTicket from "./pages/ValidateTicket";
import MyTickets from "./pages/MyTickets";
import Events from "./pages/Events";
import EditEvent from "./pages/EditEvent";



const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Oops! Page not found</p>
      <a href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        Go Back Home
      </a>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          {/* ✅ FIXED */}
          <div className="flex-1">
            <Routes>
              <Route path="/contact" element={<Contact />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/admin/events/new" element={<CreateEvent />} />
              <Route path="/admin/validate" element={<ValidateTicket />} />
              <Route path="/my-tickets" element={<MyTickets />} />
              <Route path="/events/:id/edit" element={<EditEvent />} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
          </div>

          <Footer />
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
