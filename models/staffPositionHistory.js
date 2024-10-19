// File: models/staffPositionHistory.js
const mongoose = require("mongoose");

const staffPositionHistorySchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BuildingStaff",
    required: true,
  },
  position: { type: String, required: true }, // Vị trí làm việc
  service: { type: String, required: true }, // Tên dịch vụ nhân viên phụ trách
  startDate: { type: Date, required: true }, // Ngày bắt đầu công việc ở vị trí này
  endDate: { type: Date }, // Ngày kết thúc (có thể null nếu đang làm việc tại vị trí này)
});

const StaffPositionHistory = mongoose.model(
  "StaffPositionHistory",
  staffPositionHistorySchema
);

module.exports = StaffPositionHistory;
