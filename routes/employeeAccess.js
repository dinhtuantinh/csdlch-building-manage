// File: routes/employeeAccess.js
const express = require("express");
const Employee = require("../models/employee");
const AccessLog = require("../models/accessLog");
const Company = require("../models/company");
const router = express.Router();

// API để lấy thông tin nhân viên cùng với ra/vào trong ngày
router.get("/", async (req, res) => {
  try {
    // Lấy danh sách các công ty và nhân viên từ cơ sở dữ liệu
    const companies = await Company.find().lean();

    if (companies.length === 0) {
      return res.status(404).json({ message: "No companies found" });
    }

    const result = await Promise.all(
      companies.map(async (company) => {
        const employees = await Employee.find({ company: company._id }).lean();

        // Lấy ngày hiện tại
        const today = new Date();
        const startOfDay = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        const endOfDay = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        );

        // Lấy thông tin ra/vào cho từng nhân viên trong ngày hiện tại
        const employeeAccessLogs = await Promise.all(
          employees.map(async (employee) => {
            const accessLogs = await AccessLog.find({
              employee: employee._id,
              accessTime: {
                $gte: startOfDay, // Thời gian ra/vào từ đầu ngày
                $lt: endOfDay, // Đến trước khi kết thúc ngày
              },
            }).lean();

            return {
              employee,
              accessLogs, // Danh sách log ra/vào trong ngày
            };
          })
        );

        return {
          company,
          employeeAccessLogs, // Danh sách nhân viên và log ra/vào tương ứng
        };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
