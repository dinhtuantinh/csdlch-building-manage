//Các nhân viên trong các công ty trong tòa nhà
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeCode: String,
  idCard: String,
  name: String,
  dob: Date,
  phone: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
