const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

// Add a new warehouse
router.post('/add', warehouseController.addWarehouse);

// Get all warehouses
router.get('/getAll', warehouseController.getAllWarehouses);

// Get warehouses by state code
router.get('/getByState/:stateCode', warehouseController.getWarehousesByState);

// Add stock to a warehouse
router.post('/addStock', warehouseController.addStock);

// View states with code, number of warehouses, and total stock capacity
router.get('/view-states', warehouseController.viewStates);

// Get warehouse information by warehouseId
router.get('/info/:warehouseId', warehouseController.getWarehouseInfo);

module.exports = router;

/*********************************************
 // Add a new warehouse
http://localhost:8080/warehouses/add
 {
  "name": "abc",
  "state": "Haryana",
  "location": "fbd",
  "stockLimit": 1000
}

// Get all warehouses
http://localhost:8080/warehouses/getAll

// Get warehouses by state code
http://localhost:8080/warehouses/getByState/HR

// Add stock to a warehouse
http://localhost:8080/warehouses/addStock
{
  "sku_id": "",
  "warehouseId": "your_warehouseId_here",
  "quantity": 10
}
add SKU ID of the product
add warehouse ID of the target warehouse

// View states with code, number of warehouses, and total stock capacity
http://localhost:8080/warehouses/view-states

// Get warehouse information by warehouseId
http://localhost:8080/warehouses//info/HR1975


**********************************************/
