const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  likedHome: Array,
  role: String, // User atau Admin
});

module.exports = mongoose.model("user", userSchema);
