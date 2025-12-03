const { Pool } = require('pg');
require('dotenv').config();

console.log('Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://tom:4tD4wMjrDqDEOBjcJhqEBu3zImZXm7YR@dpg-d4n2e8ali9vc73f948a0-a.ohio-postgres.render.com/cse340_p0yy",
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection immediately
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected at:', res.rows[0].now);
    initializeDatabase();
  }
});

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');
    
    // Create classification table
    console.log('Creating classification table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS classification (
        classification_id SERIAL PRIMARY KEY,
        classification_name VARCHAR(100) NOT NULL
      )
    `);
    console.log('Classification table created/verified');
    
    // Create inventory table  
    console.log('Creating inventory table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        inv_id SERIAL PRIMARY KEY,
        inv_make VARCHAR(50) NOT NULL,
        inv_model VARCHAR(50) NOT NULL,
        inv_year INTEGER NOT NULL,
        inv_description TEXT NOT NULL,
        inv_image VARCHAR(255) NOT NULL,
        inv_thumbnail VARCHAR(255) NOT NULL,
        inv_price DECIMAL(10,2) NOT NULL,
        inv_miles INTEGER NOT NULL,
        inv_color VARCHAR(50) NOT NULL,
        classification_id INTEGER REFERENCES classification(classification_id)
      )
    `);
    console.log('Inventory table created/verified');
    
    // Check if data exists
    console.log('Checking for existing data...');
    const classResult = await pool.query('SELECT COUNT(*) as count FROM classification');
    const classCount = parseInt(classResult.rows[0].count);
    console.log(`Found ${classCount} classifications`);
    
    if (classCount === 0) {
      console.log('Inserting sample data...');
      
      // Insert classifications
      await pool.query(`
        INSERT INTO classification (classification_name) VALUES 
        ('SUV'), ('Sedan'), ('Sports Car'), ('Truck'), ('Electric')
      `);
      console.log('Classifications inserted');
      
      // Insert vehicles
      await pool.query(`
        INSERT INTO inventory (
          inv_make, inv_model, inv_year, inv_description,
          inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
        ) VALUES
        ('Toyota', 'Camry', 2022, 'Reliable sedan with great fuel economy. Perfect for daily commuting and family use.', '/images/vehicles/camry.jpg', '/images/vehicles/camry-thumb.jpg', 24500.00, 36000, 'Silver', 2),
        ('Honda', 'CR-V', 2021, 'Spacious SUV with excellent safety features. Great for families with ample cargo space.', '/images/vehicles/crv.jpg', '/images/vehicles/crv-thumb.jpg', 28200.00, 25000, 'Blue', 1),
        ('DeLorean', 'DMC-12', 1981, 'Iconic sports car with gull-wing doors. A true collector''s item.', '/images/vehicles/delorean.jpg', '/images/vehicles/delorean-thumb.jpg', 88000.00, 28000, 'Stainless Steel', 3)
      `);
      console.log('Vehicles inserted');
      
      console.log('Sample data inserted successfully');
    } else {
      console.log('Database already has data, skipping insert');
      
      // Show what's in the database
      const vehicles = await pool.query('SELECT inv_id, inv_make, inv_model FROM inventory LIMIT 5');
      console.log('Existing vehicles:', vehicles.rows);
    }
    
    console.log('Database initialization complete');
    
  } catch (error) {
    console.error('Database initialization error:', error.message);
    console.error('Full error:', error);
  }
}

module.exports = pool;