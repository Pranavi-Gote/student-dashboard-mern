const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET ALL STUDENTS (With Pagination & Search)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    // 1. Read the settings from the URL (e.g., ?page=2&search=super)
    const page = parseInt(req.query.page) || 1; // Default to Page 1
    const limit = parseInt(req.query.limit) || 5; // Default 5 students per page
    const search = req.query.search || ""; // Default no search text

    // 2. Create a Search Filter
    // This says: "Find users where Name OR Email looks like the search text"
    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } }, // 'i' means case-insensitive (A = a)
        { email: { $regex: search, $options: "i" } }
      ]
    };

    // 3. Count how many total students match (so we know how many pages we need)
    const total = await User.countDocuments(query);

    // 4. Get the actual data
    const students = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit) // Logic: If on page 2, skip the first 5
      .limit(limit); // Only take 5

    // 5. Send everything back
    res.json({
      students,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


// DELETE A STUDENT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // 1. Get the ID from the URL (e.g., /api/users/12345)
    const { id } = req.params;

    // 2. Tell the database to delete it
    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


// UPDATE A STUDENT
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body; // The new info

    // 1. Find the user and update them
    // { new: true } means "Give me back the updated file, not the old one"
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { name, email }, 
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;