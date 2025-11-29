const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

// REGISTER ROUTE (Sign Up)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // 2. Scramble the password (Security!)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student"
    });

    // 4. Save to the Fridge (Database)
    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    // 2. Check if the password is correct (Compare the scrambled versions)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    // 3. Create the Wristband (Token)
    // It holds the user's ID and Role safely inside
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" } // The wristband expires in 1 hour
    );

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// GET USER PROFILE (Protected Route)
// Notice we put 'authMiddleware' in the middle!
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Get user but hide password
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;