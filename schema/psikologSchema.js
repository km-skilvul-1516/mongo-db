const mongoose = require("mongoose");

const psikologSchema = new mongoose.Schema({
  id: Number,
  email: String,
  password: String,
  nama: String,
  alamat: String,
  patients: Array,
});

module.exports = mongoose.model("psikolog", psikologSchema);
