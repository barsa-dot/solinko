require('dotenv').config();

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(process.env.DATABASE_PATH);


// GET ALL PRODUCTS
const getProducts = (req, res) => {

  db.all(
    "SELECT * FROM products",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

};


// GET PRODUCTS WITH VENDOR DETAILS
const getProductsWithVendors = (req, res) => {

  db.all(
    `
    SELECT
      products.id,
      products.product_name,
      products.price,

      vendors.name AS vendor_name,
      vendors.city

    FROM products

    INNER JOIN vendors
    ON products.vendor_id = vendors.id
    `,

    [],

    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

};


// ADD PRODUCT
const addProduct = (req, res) => {

  const {
    vendor_id,
    product_name,
    price
  } = req.body;

  db.run(
    `
    INSERT INTO products
    (vendor_id, product_name, price)
    VALUES (?, ?, ?)
    `,
    [vendor_id, product_name, price],

    function(err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Product added successfully",
        id: this.lastID
      });

    }
  );

};


module.exports = {
  getProducts,
  getProductsWithVendors,
  addProduct
};
