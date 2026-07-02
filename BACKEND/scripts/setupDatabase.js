const sqlite3 = require('sqlite3').verbose();

// Connect to database file
const db = new sqlite3.Database('./database/database.db');

// Create tables
db.serialize(() => {

  // Vendors table
  db.run(`
    CREATE TABLE IF NOT EXISTS vendors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      city TEXT,
      email TEXT,
      rating REAL
    )
  `);

  // Customers table
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company TEXT,
      email TEXT
    )
  `);

  // Products table
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vendor_id INTEGER,
    product_name TEXT NOT NULL,
    price REAL,

    FOREIGN KEY (vendor_id)
    REFERENCES vendors(id)
  )
`);

});

db.close();

console.log("Database and tables created successfully.");