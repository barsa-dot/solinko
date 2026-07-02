require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// IMPORT ROUTES
const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');

// USE ROUTES
app.use('/', vendorRoutes);
app.use('/', productRoutes);

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});