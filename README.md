# 🎓 Student Dashboard - Full Stack MERN App

A robust Student Management System built with the **MERN Stack** (MongoDB, Express, React, Node.js). This application features secure JWT authentication, role-based access control, and a modern glassmorphism UI. It is fully containerized using **Docker** for consistent deployment.

![Tech Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)

## 🚀 Features

* **🔐 Secure Authentication:** User Registration & Login using JWT (JSON Web Tokens).
* **🛡️ Role-Based Access:** Protected routes ensuring only authenticated users can view data.
* **📊 Student Management (CRUD):**
    * **Create** new students.
    * **Read** student lists with server-side pagination & search.
    * **Update** student details.
    * **Delete** students.
* **🐳 Dockerized:** Full development environment setup with Docker Compose.
* **🎨 Modern UI:** Responsive React frontend with Zustand state management and Glassmorphism design.

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, Zustand (State Management), Axios, CSS3 (Glassmorphism).
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB Atlas (Cloud).
* **DevOps:** Docker, Docker Compose.
* **Security:** BCrypt.js (Password Hashing), JWT, CORS.

## ⚙️ Installation & Run

You can run this project easily using Docker (Recommended) or Manually.

### Option 1: Using Docker 🐳 (Easiest)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Pranavi-Gote/student-dashboard-mern.git
    cd student-dashboard-mern
    ```

2.  **Create a `.env` file** in the `server` folder (see Environment Variables below).

3.  **Run with Docker Compose:**
    ```bash
    docker-compose up --build
    ```

4.  **Open App:**
    * Frontend: `http://localhost:5173`
    * Backend: `http://localhost:5000`

---

### Option 2: Manual Setup 🛠️

**1. Backend Setup:**
```bash
cd server
npm install
node server.js
```
**2. Frontend Setup:**
```bash
cd client
npm install
npm run dev
```


🔑 Environment Variables
Create a .env file inside the server/ folder and add the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_key

📡 API Endpoints
Method | Endpoint            | Description
POST   | /api/auth/register  | Register a new user
POST   | /api/auth/login     | Login and get JWT Token
GET    | /api/auth/profile   | Get current user details (Protected)
GET    | /api/users/all      | Get all students (Pagination + Search)
PUT    | /api/users/:id      | Update student details
DELETE | /api/users/:id      | Delete a student

Made with ❤️ by Pranavi Gote
