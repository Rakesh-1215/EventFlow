import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 🔹 Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-linear-to-br from-blue-500 to-purple-600 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm">
                EF
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Event<span className="text-indigo-600">Flow</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Your reliable partner for discovering and booking amazing events
              around you. Making memories, one ticket at a time.
            </p>
          </div>

          {/* 🔹 Quick Links Section */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">
              Quick Links
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors font-medium"
                >
                  All Events
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors font-medium"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 🔹 Contact/Support Section */}
          <div>
            <h5 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">
              Support
            </h5>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors font-medium"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors font-medium"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="text-gray-400 text-sm">support@eventflow.com</li>
            </ul>
          </div>
        </div>

        {/* 🔹 Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} EventFlow. Built for experiences.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
