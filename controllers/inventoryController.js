const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invCont = {};

// Build vehicle detail view
invCont.buildByInventoryId = async function (req, res, next) {
  try {
    const inv_id = req.params.id;
    const vehicle = await invModel.getInventoryById(inv_id);
    
    if (vehicle) {
      res.render("inventory/detail", {
        title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
        vehicle: vehicle,
        utilities: utilities
      });
    } else {
      // Vehicle not found - trigger 404
      const error = new Error("Vehicle not found");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    console.error("Error in buildByInventoryId:", error);
    next(error);
  }
};

module.exports = invCont;