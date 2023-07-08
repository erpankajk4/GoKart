const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const productController = require('../controllers/productController');

// Add a new customer
router.post('/addCustomer', customerController.addCustomer);

// Delete customer by ID
router.delete('/:customerId', customerController.deleteCustomerById); 

// Process an order
router.post('/orders/process', productController.processOrder);

// View all orders
router.get('/orders', productController.viewOrders);

module.exports = router;



/***************************************
// Add a new customer
 http://localhost:8080/customer/addCustomer
{
    "name": "Pankaj",
    "customerId" : "123"
}

// Delete customer by ID
 http://localhost:8080/customer/:customerId

// Process an order
 http://localhost:8080/customer/orders/process
 {
  "customerId": "123",
  "sku_id": "3175",
  "orderQty": 5,
  "customerLoc": "fbd"
}

// View all orders
 http://localhost:8080/customer/orders

 *****************************************/
