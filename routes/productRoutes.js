const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Add a new product
router.post('/addProduct', productController.addProduct);

// Get products by category, subcategory, or all products
router.get('/getProducts', productController.getProducts);

// Delete a product by SKU ID
router.delete('/deleteProduct/:sku_id', productController.deleteProduct);

module.exports = router;


/**************************************
Add a new product
http://localhost:8080/products/addProduct
{
    "name": "iphone x8",
    "category": "phone" ,
    "subCategory": "apple" ,
    "imageLink": "https://example.com/image.jpg"
}

Get products by category, subcategory, or all products
http://localhost:8080/products/getProducts
http://localhost:8080/products/getProducts?category=phone
http://localhost:8080/products/getProducts?category=phone&subCategory=apple

// Delete a product by SKU ID
http://localhost:8080/products/deleteProduct/:sku_id
*************************************/


