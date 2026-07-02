const express = require('express');

const router = express.Router();

const {
  getProducts,
  getProductsWithVendors,
  addProduct
} = require('../controllers/productController');


// GET PRODUCTS
router.get('/products', getProducts);


// GET PRODUCTS WITH VENDORS
router.get('/products-with-vendors', getProductsWithVendors);


// ADD PRODUCT
router.post('/addProduct', addProduct);


module.exports = router;
