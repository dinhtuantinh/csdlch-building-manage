//API cho Dịch vụ
const express = require("express");
const Service = require("../models/service");
const router = express.Router();

// Lấy danh sách các dịch vụ
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo mới dịch vụ
router.post("/", async (req, res) => {
  const service = new Service({
    serviceCode: req.body.serviceCode,
    name: req.body.name,
    type: req.body.type,
    basePrice: req.body.basePrice,
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
