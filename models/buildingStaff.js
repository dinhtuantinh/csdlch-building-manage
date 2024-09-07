const mongoose = require("mongoose");

const buildingStaffSchema = new mongoose.Schema({
  name: String,
  birthDate: Date,
  address: String,
  phone: String,
  position: String,
  salary: Number, // Hoặc thuộc tính khác tùy vào yêu cầu
});

module.exports = mongoose.model("BuildingStaff", buildingStaffSchema);
