const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  likedHome: Array,
});

module.exports = mongoose.model("user", userSchema);
