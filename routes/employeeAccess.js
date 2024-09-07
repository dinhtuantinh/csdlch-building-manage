// File: routes/employeeAccess.js
const express = require("express");
const Employee = require("../models/employee");
const AccessLog = require("../models/accessLog");
const router = express.Router();

// API để lấy thông tin nhân viên cùng với ra/vào
router.get("/", async (req, res) => {
  try {
    // Lấy danh sách nhân viên từ cơ sở dữ liệu
    const employees = await Employee.find().lean();

    // Ràng buộc kiểm tra nếu không có nhân viên nào
    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    // Lấy thông tin ra/vào cho mỗi nhân viên
    const employeeAccessLogs = await Promise.all(
      employees.map(async (employee) => {
        const accessLogs = await AccessLog.find({
          employee: employee._id,
        }).lean();
        return {
          employee,
          accessLogs,
        };
      })
    );

    res.status(200).json(employeeAccessLogs); // Trả kết quả cho client
  } catch (error) {
    res.status(500).json({ message: error.message }); // Xử lý lỗi
  }
});

module.exports = router;
