const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  warnaRumah: String,
  nomerRumah: Number,
  alamatRumah: String,
  anggotaRumah: Array,
  jumlahLike: Number,
});

module.exports = mongoose.model("rumah", homeSchema);
