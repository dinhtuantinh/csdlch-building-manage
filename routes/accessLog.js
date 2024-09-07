// /API để ghi lại thông tin ra vào của nhân viên
const express = require("express");
const AccessLog = require("../models/accessLog");
const router = express.Router();

// Ghi lại lịch sử ra vào
router.post("/", async (req, res) => {
  const accessLog = new AccessLog({
    employee: req.body.employeeId,
    location: req.body.location,
    accessTime: new Date(),
  });

  try {
    const newLog = await accessLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
