require("dotenv").config();
require("./models");

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const hrRoutes = require("./routes/hr");
const employeeRoutes = require("./routes/employee");
const fileRoutes = require("./routes/file");
const profileRoutes = require("./routes/profile");



const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api", hrRoutes);
app.use("/api", employeeRoutes);
app.use("/api", fileRoutes);
app.use("/api", profileRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});



app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});