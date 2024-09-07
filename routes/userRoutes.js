// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route để tạo người dùng
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;