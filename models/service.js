const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceCode: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  unitPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Service", serviceSchema);
