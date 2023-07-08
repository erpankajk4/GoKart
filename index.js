// Environmental Variables
require('dotenv').config(".env");

const productRoutes = require('./routes/productRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const customerRoutes = require('./routes/customerRoutes');
// Import Modules 
const express = require('express');

// Connecting to the MongoDB database using Mongoose
const db = require('./config/mongoose');

// Creating an instance of the Express application
const app = express();

// Middleware
app.use(express.json());

// Use express router
app.use('/products', productRoutes);
app.use('/warehouses', warehouseRoutes);
app.use('/customer', customerRoutes);

// PORT Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on port  ${PORT}`));
