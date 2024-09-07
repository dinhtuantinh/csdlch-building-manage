//Lịch sử ra vào
const mongoose = require("mongoose");

const accessLogSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  location: { type: String, enum: ["Tầng 1", "Hầm B1", "Hầm B2"] },
  accessTime: Date,
});

module.exports = mongoose.model("AccessLog", accessLogSchema);
