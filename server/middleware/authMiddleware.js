const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Look for the token in the header (It usually says "Bearer [TOKEN]")
  const token = req.header("Authorization");

  // 2. If there is no token, kick them out
  if (!token) {
    return res.status(401).json({ message: "Access Denied! No token provided." });
  }

  try {
    // 3. Verify the token (Is it a real wristband or a fake one?)
    // We remove the word "Bearer " if it's there to just get the code
    const tokenString = token.replace("Bearer ", "");
    
    const verified = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = verified; // Attach the user info to the request
    next(); // Let them in!
  } catch (err) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};

module.exports = authMiddleware;