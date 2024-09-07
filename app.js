require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const companyRoutes = require("./routes/company");
const employeeRoutes = require("./routes/employee");
const serviceRoutes = require("./routes/service");
const companyServiceUsageRoutes = require("./routes/companyServiceUsage");
const accessLogRoutes = require("./routes/accessLog");

const app = express();
app.use(express.json()); // Parse JSON request

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Đã kết nối MongoDB");
  })
  .catch((error) => {
    console.error("Lỗi kết nối MongoDB:", error);
  });

// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/company-services", companyServiceUsageRoutes);
app.use("/api/access-log", accessLogRoutes);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
