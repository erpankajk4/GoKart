const Product = require('../models/product');
const Warehouse = require('../models/warehouse');
const Customer = require('../models/customer');
const Order = require('../models/order');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, subCategory, imageLink } = req.body;
    const sku_id = generateSkuId(); // Generate the SKU ID
    const product = new Product({
      name,
      sku_id,
      category,
      subCategory,
      imageLink,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add the product' });
  }
};

// Helper function to generate SKU ID
function generateSkuId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
  return randomNum.toString();
}
/**********************************************************/

// Get products by category, subcategory, or all products
exports.getProducts = async (req, res) => {
    try {
      const { category, subCategory } = req.query;
      let filter = {};
      if (category) {
        filter.category = category;
      }
      if (subCategory) {
        filter.subCategory = subCategory;
      }
      const products = await Product.find(filter);
      const productsWithStock = await Promise.all(
        products.map(async (product) => {
          const warehouses = await Warehouse.find({
            'products.product': product._id,
            'products.quantity': { $gt: 0 },
          }).select('warehouseId');
          const stockQuantity = warehouses.reduce(
            (total, warehouse) =>
              total + getWarehouseProductQuantity(warehouse, product._id),
            0
          );
          product.stockQuantity = stockQuantity; // Update the stockQuantity field
          if (warehouses.length === 0) {
            return {
              _id: product._id,
              name: product.name,
              sku_id: product.sku_id,
              category: product.category,
              subCategory: product.subCategory,
              stockQuantity: 0,
              inStockWarehouses: 'This product is not available in any warehouse.',
            };
          }
          return {
            _id: product._id,
            name: product.name,
            sku_id: product.sku_id,
            category: product.category,
            subCategory: product.subCategory,
            stockQuantity,
            inStockWarehouses: warehouses,
          };
        })
      );
      res.json(productsWithStock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  };
  
// Helper function to get the product quantity in a specific warehouse
function getWarehouseProductQuantity(warehouse, productId) {
    if (!warehouse || !warehouse.products) {
      return 0;
    }
  
    const product = warehouse.products.find(
      (wp) => wp.product && wp.product.toString() === productId.toString()
    );
  
    return product ? product.quantity : 0;
  }
/***************************************************************/
// Delete a product by SKU ID
exports.deleteProduct = async (req, res) => {
  try {
    const { sku_id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ sku_id });
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({
      message: 'Product deleted successfully',
      deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the product' });
  }
};
/**************************************************************/

// Process an order
exports.processOrder = async (req, res) => {
  try {
    const { customerId, sku_id, orderQty, customerLoc } = req.body;

    // Find the customer
    const customer = await Customer.findOne({ customerId });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Find the product
    const product = await Product.findOne({ sku_id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the warehouse location is the same as the customer location
    const isProductAvailableInWarehouse = product.inStockWarehouses.some(
      (warehouseId) => warehouseId.location === customerLoc
    );

    if (isProductAvailableInWarehouse) {
      // Place the order directly
      const order = new Order({
        customerId: customer.customerId,
        customerName: customer.name,
        productName: product.name,
        sku_id: product.sku_id,
        fulfillmentStatus: 'Fulfilled',
        linkedWarehouse: customerLoc,
      });

      await order.save();

      return res.status(200).json(order);
    }

    // Find a warehouse with the required quantity of the product
    const warehouse = await Warehouse.findOne({
      'products.product': product._id,
      'products.quantity': { $gte: orderQty },
    });

    if (!warehouse) {
      // No warehouse has the required quantity
      const order = new Order({
        customerId: customer.customerId,
        customerName: customer.name,
        productName: product.name,
        sku_id: product.sku_id,
        fulfillmentStatus: 'Out of Stock',
        linkedWarehouse: null,
      });

      await order.save();

      return res.status(200).json(order);
    }

    // Fulfill the order from the found warehouse
    const productIndex = warehouse.products.findIndex(
      (wp) => wp.product.toString() === product._id.toString()
    );

    warehouse.products[productIndex].quantity -= orderQty;

    await warehouse.save();

    const order = new Order({
      customerId: customer.customerId,
      customerName: customer.name,
      productName: product.name,
      sku_id: product.sku_id,
      fulfillmentStatus: 'Fulfilled',
      linkedWarehouse: warehouse.name,
    });

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the order' });
  }
};
/******************************************************************/

// View all orders
exports.viewOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
/****************************************************************** */
