const express = require("express");
const Company = require("../models/company");
const router = express.Router();

// Lấy danh sách công ty
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo mới một công ty
router.post("/", async (req, res) => {
  const company = new Company({
    name: req.body.name,
    taxCode: req.body.taxCode,
    charterCapital: req.body.charterCapital,
    field: req.body.field,
    employeeCount: req.body.employeeCount,
    address: req.body.address,
    phone: req.body.phone,
    area: req.body.area,
  });

  try {
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
