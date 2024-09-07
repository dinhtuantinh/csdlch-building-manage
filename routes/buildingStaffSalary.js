// File: routes/buildingStaffSalary.js
const express = require("express");
const BuildingStaff = require("../models/buildingStaff");
const router = express.Router();

// API để lấy thông tin nhân viên toà nhà cùng lương
router.get("/", async (req, res) => {
  try {
    // Lấy danh sách nhân viên toà nhà từ cơ sở dữ liệu
    const buildingStaff = await BuildingStaff.find().lean();

    // Ràng buộc kiểm tra nếu không có nhân viên nào
    if (buildingStaff.length === 0) {
      return res.status(404).json({ message: "No building staff found" });
    }

    // Tính toán lương cho từng nhân viên
    const staffSalaries = buildingStaff.map((staff) => {
      const salary = calculateSalary(staff); // Hàm tính lương dựa trên vị trí và dịch vụ
      return {
        ...staff,
        salary, // Thêm lương vào kết quả
      };
    });

    res.status(200).json(staffSalaries); // Trả kết quả cho client
  } catch (error) {
    res.status(500).json({ message: error.message }); // Xử lý lỗi
  }
});

// Hàm tính lương mẫu (bạn có thể thay đổi theo yêu cầu)
function calculateSalary(staff) {
  // Tính lương dựa trên vị trí và dịch vụ
  return 3000; // Ví dụ
}

module.exports = router;
