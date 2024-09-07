const mongoose = require("mongoose");

const accessLogSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  accessTime: { type: Date, required: true },
  exitTime: { type: Date, required: true },
  location: {
    type: String,
    enum: ["B1 Basement", "B2 Basement", "Floor 1"], // Giá trị hợp lệ
    required: true,
  },
});

module.exports = mongoose.model("AccessLog", accessLogSchema);
