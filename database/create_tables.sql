-- Create classification table
CREATE TABLE IF NOT EXISTS classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(100) NOT NULL
);

-- Create inventory table
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
);

-- Insert sample data
INSERT INTO classification (classification_name) VALUES 
('SUV'), ('Sedan'), ('Sports Car'), ('Truck'), ('Electric');

INSERT INTO inventory (
    inv_make, inv_model, inv_year, inv_description,
    inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
) VALUES
('Toyota', 'Camry', 2022, 'Reliable sedan with great fuel economy',
'/images/vehicles/camry-full.jpg', '/images/vehicles/camry-thumb.jpg', 24500.00, 36000, 'Silver', 2),
('Honda', 'CR-V', 2021, 'Spacious SUV with excellent safety features',
'/images/vehicles/crv-full.jpg', '/images/vehicles/crv-thumb.jpg', 28200.00, 25000, 'Blue', 1),
('DeLorean', 'DMC-12', 1981, 'Iconic sports car with gull-wing doors',
'/images/vehicles/delorean-full.jpg', '/images/vehicles/delorean-thumb.jpg', 88000.00, 28000, 'Stainless Steel', 3);