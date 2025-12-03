const pool = require("../database/db-connector");

const invModel = {};

// Get vehicle by ID (PARAMETERIZED QUERY)
invModel.getInventoryById = async function (inventoryId) {
  try {
    const sql = `
      SELECT * FROM inventory 
      WHERE inv_id = $1
    `;
    const data = await pool.query(sql, [inventoryId]);
    return data.rows[0];
  } catch (error) {
    console.error("getInventoryById error: " + error);
    return null;
  }
};

module.exports = invModel;