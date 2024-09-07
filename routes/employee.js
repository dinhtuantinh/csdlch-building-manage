const express = require("express");
const Employee = require("../models/employee");
const router = express.Router();

// Lấy danh sách nhân viên
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().populate("company");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo mới một nhân viên
router.post("/", async (req, res) => {
  const employee = new Employee({
    employeeCode: req.body.employeeCode,
    idCard: req.body.idCard,
    name: req.body.name,
    dob: req.body.dob,
    phone: req.body.phone,
    company: req.body.companyId,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
