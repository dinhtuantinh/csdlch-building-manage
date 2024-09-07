const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  taxCode: { type: String, required: true },
  charterCapital: { type: Number, required: true },
  industry: { type: String, required: true },
  employeeCount: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  area: { type: Number, required: true },
});

module.exports = mongoose.model("Company", companySchema);
