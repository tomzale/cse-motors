const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");
const errorController = require("../controllers/errorController");

// Home Route
router.get("/", (req, res) => {
  res.render("index");
});

// Vehicle Detail Route
router.get("/inv/detail/:id", invController.buildByInventoryId);

// Error Test Route
router.get("/error/test", errorController.triggerError);

module.exports = router;