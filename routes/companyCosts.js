// File: routes/companyCosts.js
const express = require("express");
const Company = require("../models/company");
const CompanyServiceUsage = require("../models/companyServiceUsage");
const router = express.Router();

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
        const areaCost = company.area * 1000; // Đơn giá thuê mặt bằng, ví dụ 1000
        const serviceUsages = await CompanyServiceUsage.find({
          company: company._id,
        }).lean();
        const totalServiceCost = serviceUsages.reduce((total, usage) => {
          const currentDate = new Date();
          // Tính tổng tiền dịch vụ dựa trên thời gian sử dụng
          return (
            total +
            (usage.unitPrice * (currentDate - usage.registeredDate)) /
              (1000 * 60 * 60 * 24)
          );
        }, 0);

        return {
          ...company,
          totalCost: areaCost + totalServiceCost, // Tổng chi phí
        };
      })
    );

    // Sắp xếp các công ty theo chi phí giảm dần
    const sortedCompanies = companyCosts.sort(
      (a, b) => b.totalCost - a.totalCost
    );
    res.status(200).json(sortedCompanies); // Trả kết quả cho client
  } catch (error) {
    res.status(500).json({ message: error.message }); // Xử lý lỗi
  }
});

module.exports = router;
