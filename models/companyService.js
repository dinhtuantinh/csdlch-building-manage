//Dịch vụ cung cấp cho các công ty sử dựng trong tòa nhà
const mongoose = require("mongoose");

const companyServiceUsageSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  registeredDate: Date,
  area: Number,
  employeeCount: Number,
  unitPrice: Number, // Tính theo công thức tùy thuộc vào số nhân viên và diện tích
});

module.exports = mongoose.model(
  "CompanyServiceUsage",
  companyServiceUsageSchema
);
