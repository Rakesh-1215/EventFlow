# Event Management System (EVENTFLOW)

## Project Overview

This is a full-stack Event Management System built using the MERN stack. The application allows users to create, manage, and book events, along with handling tickets and authentication.

---

## Features

* User Authentication (Login/Register)
* Event Creation and Management
* Ticket Booking System
* Protected Routes using Middleware
* Modular Backend Structure
* RESTful APIs

---

## Tech Stack

### Frontend

* React.js (if used)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

## Project Structure

```
event-management-system/
│
├── backend/
│   ├── app.js
│   ├── middleware/
│   │   └── auth.js
│   ├── module/
│   │   ├── user.js
│   │   ├── event.js
│   │   ├── ticket.js
│   ├── init/
│   ├── seed.js
│
├── package.json
```

---

## Installation and Setup

1. Clone Repository
   git clone https://github.com/your-username/event-management-system.git
   cd event-management-system

2. Install Dependencies
   npm install

3. Setup Environment Variables
   Create a .env file and add:
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

4. Run the Server
   npm start

---

## API Flow

Client → Request → Express Server → Route → Controller → MongoDB → Response → Client

---

## Authentication

* Uses JWT (JSON Web Token)
* Middleware protects private routes
* Ensures secure access

---

## Key Concepts Used

* REST API Design
* Middleware in Express
* MVC Pattern
* MongoDB CRUD Operations
* Authentication and Authorization

---
