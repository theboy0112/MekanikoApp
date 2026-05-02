const express = require("express");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Mekaniko REST API is running ");
});
app.use("/api/users", userRoutes);
module.exports = app;
