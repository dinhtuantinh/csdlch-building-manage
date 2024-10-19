const express = require("express");
const BuildingStaff = require("../models/buildingStaff");
const StaffPositionHistory = require("../models/staffPositionHistory"); // Mô hình lịch sử vị trí làm việc của nhân viên
const router = express.Router();

// API để lấy thông tin nhân viên tòa nhà cùng lương theo tháng
router.get("/", async (req, res) => {
  try {
    // Lấy tháng từ query parameters (nếu không có thì mặc định là tháng hiện tại)
    const month = req.query.month ? new Date(req.query.month) : new Date();
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    // Lấy danh sách nhân viên tòa nhà từ cơ sở dữ liệu
    const buildingStaff = await BuildingStaff.find().lean();

    // Ràng buộc kiểm tra nếu không có nhân viên nào
    if (buildingStaff.length === 0) {
      return res.status(404).json({ message: "No building staff found" });
    }

    // Tính toán lương cho từng nhân viên
    const staffSalaries = await Promise.all(
      buildingStaff.map(async (staff) => {
        // Lấy thông tin lịch sử vị trí của nhân viên trong tháng
        const positionHistory = await StaffPositionHistory.findOne({
          staffId: staff._id,
          month: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        }).lean();

        // Nếu không có thông tin lịch sử cho tháng đó, có thể là nhân viên không làm việc hoặc giữ nguyên vị trí
        if (!positionHistory) {
          return {
            ...staff,
            salary: 0, // Không có lương nếu không có lịch sử vị trí
          };
        }

        // Tính lương dựa trên lịch sử vị trí và dịch vụ của nhân viên trong tháng đó
        const salary = calculateSalary(positionHistory);

        return {
          ...staff,
          position: positionHistory.position, // Bậc công việc trong tháng
          service: positionHistory.service, // Tên dịch vụ trong tháng
          salary, // Thêm lương vào kết quả
        };
      })
    );

    res.status(200).json(staffSalaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hàm tính lương dựa trên bậc công việc và dịch vụ
function calculateSalary(positionHistory) {
  const baseSalary = 3000; // Lương cơ bản
  let salary = baseSalary;

  // Tính lương dựa trên bậc công việc
  switch (positionHistory.position) {
    case "Manager":
      salary += 2000;
      break;
    case "Supervisor":
      salary += 1000;
      break;
    case "Worker":
      salary += 500;
      break;
    default:
      salary += 0;
  }

  // Thêm phần lương theo dịch vụ mà nhân viên làm
  if (positionHistory.service === "Security") {
    salary += 500;
  } else if (positionHistory.service === "Cleaning") {
    salary += 300;
  } else if (positionHistory.service === "Maintenance") {
    salary += 400;
  }

  return salary;
}

module.exports = router;
