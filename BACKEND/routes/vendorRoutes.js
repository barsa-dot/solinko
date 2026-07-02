const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const {
  getVendors,
  getVendorById,
  getCategories,
  searchVendors,
  filterVendors,
  addVendor,
  updateVendor,
  deleteVendor
} = require('../controllers/vendorController');


// VALIDATION
const validateVendor = [

  body('name')
    .notEmpty()
    .withMessage('Vendor name is required'),

  body('email')
    .isEmail()
    .withMessage('Invalid email'),

  body('rating')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5')

];

const handleValidationErrors = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({
      errors: errors.array()
    });

  }

  next();

};


// GET ALL VENDORS
router.get('/vendors', getVendors);

// GET CATEGORIES
router.get('/vendors/categories', getCategories);

// SEARCH VENDORS
router.get('/vendors/search', searchVendors);

// FILTER VENDORS
router.get('/vendors/filter', filterVendors);

router.get('/vendors/:id', getVendorById);

// ADD VENDOR
router.post(
  '/addVendor',
  validateVendor,
  handleValidationErrors,
  addVendor
);

// UPDATE VENDOR
router.put(
  '/updateVendor/:id',
  validateVendor,
  handleValidationErrors,
  updateVendor
);

// DELETE VENDOR
router.delete('/deleteVendor/:id', deleteVendor);

module.exports = router;