import React, { useState } from "react";
import "./Contact.css";
import { API_BASE_URL } from "../api";

const Contact = () => {
  // State handle karne ke liye
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Input change hone par state update karein
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message Saved Successfully!");
        setFormData({ name: "", email: "", message: "" }); // Form clear karne ke liye
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Frontend Error:", err);
      alert("Server is not responding");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="contact-card">
        <div>
          <h1>Contact Us</h1>
          <p>Get in touch with the EventFlow team</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label>Name</label>
            <input
              type="text"
              name="name" // Backend se match karne ke liye name tag zaruri hai
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="rahul@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="How can we help you?"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="contact-btn">
            Get in Touch
          </button>
        </form>

        <div className="card-footer">
          <p>
            Prefer email? <span>support@eventflow.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
