-- Create the database
CREATE DATABASE music_db;

-- Use the created database
USE music_db;

-- Create the 'stock' table
CREATE TABLE stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50),
    numberOfMembers INT,
    style VARCHAR(50)
);

-- Create the 'Album' table
CREATE TABLE Album (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    numberOfTracks INT,
    releaseYear YEAR,
    stockId INT,
    FOREIGN KEY (stockId) REFERENCES stock(id)
);

-- Insert sample data into the 'stock' table
INSERT INTO stock (name, country, numberOfMembers, style)
VALUES 
('The Beatles', 'UK', 4, 'Rock'),
('Daft Punk', 'France', 2, 'Electronic'),
('Nirvana', 'USA', 3, 'Grunge');

-- Insert sample data into the 'Album' table
INSERT INTO Album (name, numberOfTracks, releaseYear, stockId)
VALUES 
('Abbey Road', 17, 1969, 1),
('Discovery', 14, 2001, 2),
('Nevermind', 12, 1991, 3);

