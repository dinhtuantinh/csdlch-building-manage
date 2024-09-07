//Nhân viên của tòa nhà
const mongoose = require("mongoose");

const buildingEmployeeSchema = new mongoose.Schema({
  employeeCode: String,
  name: String,
  dob: Date,
  address: String,
  phone: String,
  rank: String,
  position: String,
});

module.exports = mongoose.model("BuildingEmployee", buildingEmployeeSchema);
