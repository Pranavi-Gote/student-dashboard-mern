const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // NEW: Import it here 👈

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // NEW: Use it here 👈

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});