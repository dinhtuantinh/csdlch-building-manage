const mongoose = require("mongoose");
const Company = require("./models/company");
const Service = require("./models/service");
const CompanyServiceUsage = require("./models/companyServiceUsage");
const Employee = require("./models/employee");
const AccessLog = require("./models/accessLog");

const seedDatabase = async () => {
  await mongoose.connect("mongodb://localhost:27017/building", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB connected");

  // Dữ liệu cho Company
  const companies = [
    {
      name: "ABC Corp",
      taxCode: "123456789",
      charterCapital: 100000000,
      industry: "Technology",
      employeeCount: 50,
      address: "Floor 5, Building A",
      phone: "0123456789",
      area: 200,
    },
    {
      name: "XYZ Ltd",
      taxCode: "987654321",
      charterCapital: 200000000,
      industry: "Finance",
      employeeCount: 30,
      address: "Floor 8, Building B",
      phone: "0987654321",
      area: 150,
    },
  ];

  const insertedCompanies = await Company.insertMany(companies);
  console.log("Inserted Companies:", insertedCompanies);

  // Dữ liệu cho Service
  const services = [
    {
      serviceCode: "S001",
      name: "Cleaning",
      type: "Mandatory",
      unitPrice: 500,
    },
    {
      serviceCode: "S002",
      name: "Security",
      type: "Mandatory",
      unitPrice: 800,
    },
    {
      serviceCode: "S003",
      name: "Parking",
      type: "Optional",
      unitPrice: 200,
    },
    {
      serviceCode: "S004",
      name: "Maintenance",
      type: "Optional",
      unitPrice: 300,
    },
  ];

  const insertedServices = await Service.insertMany(services);
  console.log("Inserted Services:", insertedServices);

  // Dữ liệu cho Employee
  const employees = [
    {
      employeeCode: "E001",
      idCard: "123456789",
      name: "John Doe",
      dateOfBirth: new Date("1990-01-01"),
      phone: "0123456789",
      company: insertedCompanies[0]._id, // Gán công ty cho nhân viên
    },
    {
      employeeCode: "E002",
      idCard: "987654321",
      name: "Jane Smith",
      dateOfBirth: new Date("1995-01-01"),
      phone: "0987654321",
      company: insertedCompanies[1]._id, // Gán công ty cho nhân viên
    },
  ];

  const insertedEmployees = await Employee.insertMany(employees);
  console.log("Inserted Employees:", insertedEmployees);

  // Dữ liệu cho Company Service Usage
  const companyServiceUsage = {
    company: insertedCompanies[0]._id,
    service: insertedServices[0]._id,
    registeredDate: new Date(),
    area: 200,
    employeeCount: 50,
    unitPrice: 500,
  };

  const insertedUsage = await CompanyServiceUsage.create(companyServiceUsage);
  console.log("Inserted Service Usage:", insertedUsage);

  // Dữ liệu cho Access Log
  const accessLogs = [
    {
      employee: insertedEmployees[0]._id,
      accessTime: new Date(),
      exitTime: new Date(Date.now() + 3600000), // Một giờ sau
      location: "Floor 1",
    },
    {
      employee: insertedEmployees[1]._id,
      accessTime: new Date(Date.now() - 7200000), // Hai giờ trước
      exitTime: new Date(Date.now() - 3600000), // Một giờ trước
      location: "B1 Basement",
    },
  ];

  const insertedAccessLogs = await AccessLog.insertMany(accessLogs);
  console.log("Inserted Access Logs:", insertedAccessLogs);

  // Đóng kết nối
  await mongoose.disconnect();
};

seedDatabase().catch((error) => console.error(error));
