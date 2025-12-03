const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Database Connection
require("./database/db-connector");

// Routes
const routes = require("./routes");
app.use("/", routes);

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).render("errors/404", {
    title: "404 - Page Not Found",
    message: "Sorry, the page you requested does not exist."
  });
});

// 500 Error Handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).render("errors/500", {
    title: "500 - Server Error",
    message: err.message || "Something went wrong on our end."
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});