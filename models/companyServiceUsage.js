const mongoose = require("mongoose");

const companyServiceUsageSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  registeredDate: { type: Date, default: Date.now },
  area: { type: Number, required: true },
  employeeCount: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

module.exports = mongoose.model(
  "CompanyServiceUsage",
  companyServiceUsageSchema
);
