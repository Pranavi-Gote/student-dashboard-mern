const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // They MUST have a name
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two people can have the same email!
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "admin"], // Only these two roles are allowed
    default: "student", // If we don't say, they are a student
  },
});

module.exports = mongoose.model("User", UserSchema);