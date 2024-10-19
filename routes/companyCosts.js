// File: routes/companyCosts.js
const express = require("express");
const Company = require("../models/company");
const CompanyServiceUsage = require("../models/companyServiceUsage");
const router = express.Router();

// Đơn giá thuê mặt bằng (cố định), ví dụ 1000
const BASE_AREA_PRICE = 1000;

// Đơn giá cơ sở cho dịch vụ đối với công ty dưới 10 nhân viên và dưới 100 m2
const BASE_SERVICE_PRICE = 500; // Ví dụ đơn giá cơ sở cho dịch vụ

// Hàm tính chi phí dịch vụ tăng dần theo số nhân viên và diện tích
function calculateServicePrice(company) {
  let price = BASE_SERVICE_PRICE;

  // Tăng 5% mỗi khi thêm 5 nhân viên
  if (company.employeeCount > 10) {
    price += price * Math.floor((company.employeeCount - 10) / 5) * 0.05;
  }

  // Tăng 5% mỗi khi thêm 10 m2 diện tích
  if (company.area > 100) {
    price += price * Math.floor((company.area - 100) / 10) * 0.05;
  }

  return price;
}

// API để lấy thông tin công ty và chi phí
router.get("/", async (req, res) => {
  try {
    // Lấy danh sách các công ty từ cơ sở dữ liệu
    const companies = await Company.find().lean();

    // Ràng buộc kiểm tra nếu không có công ty nào
    if (companies.length === 0) {
      return res.status(404).json({ message: "No companies found" });
    }

    // Tính toán chi phí cho mỗi công ty
    const companyCosts = await Promise.all(
      companies.map(async (company) => {
        // Tính tiền thuê mặt bằng
        const areaCost = company.area * BASE_AREA_PRICE;

        // Lấy danh sách dịch vụ mà công ty sử dụng
        const serviceUsages = await CompanyServiceUsage.find({
          company: company._id,
        }).lean();

        // Tính tổng tiền dịch vụ dựa trên số nhân viên và diện tích
        const totalServiceCost = serviceUsages.reduce((total, usage) => {
          const currentDate = new Date();
          const daysInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          ).getDate();
          const daysUsed =
            (currentDate - usage.registeredDate) / (1000 * 60 * 60 * 24);

          // Tính đơn giá dịch vụ dựa trên công ty (nhân viên, diện tích)
          const servicePrice = calculateServicePrice(company);

          // Tiền dịch vụ tính theo tỷ lệ số ngày đã sử dụng trên tổng số ngày trong tháng
          return total + servicePrice * (daysUsed / daysInMonth);
        }, 0);

        return {
          ...company,
          totalCost: areaCost + totalServiceCost, // Tổng chi phí bao gồm tiền thuê mặt bằng và tiền dịch vụ
        };
      })
    );

    // Sắp xếp các công ty theo chi phí giảm dần
    const sortedCompanies = companyCosts.sort(
      (a, b) => b.totalCost - a.totalCost
    );

    res.status(200).json(sortedCompanies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
