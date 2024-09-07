//API cho việc sử dụng dịch vụ của công ty
const express = require("express");
const CompanyServiceUsage = require("../models/companyServiceUsage");
const { calculateServiceCost } = require("./utils/calculateServiceCost"); // Import hàm tính toán chi phí
const router = express.Router();

// Tạo mới một đăng ký sử dụng dịch vụ
// Tạo mới một đăng ký sử dụng dịch vụ
router.post("/", async (req, res) => {
  const { companyId, serviceId, area, employeeCount, registeredDate } =
    req.body;

  const basePrice = 1000; // Đơn giá cơ bản
  let unitPrice = basePrice;

  // Tính giá theo công thức tỉ lệ thuận với số nhân viên và diện tích
  if (employeeCount > 10 || area > 100) {
    const additionalEmployees = Math.floor((employeeCount - 10) / 5);
    const additionalArea = Math.floor((area - 100) / 10);
    unitPrice += unitPrice * 0.05 * (additionalEmployees + additionalArea);
  }

  const companyServiceUsage = new CompanyServiceUsage({
    company: companyId,
    service: serviceId,
    registeredDate: registeredDate || new Date(),
    area,
    employeeCount,
    unitPrice,
  });

  try {
    const newUsage = await companyServiceUsage.save();
    const currentDate = new Date();

    // Tính toán chi phí cho dịch vụ mới đăng ký
    const totalCost = calculateServiceCost(newUsage, currentDate);

    res.status(201).json({ newUsage, totalCost }); // Trả về chi phí tính toán sau khi đăng ký
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// API tính tổng chi phí dịch vụ cho công ty
router.get("/:companyId/calculate-cost", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const usages = await CompanyServiceUsage.find({ company: companyId });

    const currentDate = new Date();
    let totalCost = 0;

    usages.forEach((usage) => {
      totalCost += calculateServiceCost(usage, currentDate); // Sử dụng hàm calculateServiceCost để tính chi phí
    });

    res.json({ totalCost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
