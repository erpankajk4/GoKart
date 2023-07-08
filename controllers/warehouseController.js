const Warehouse = require('../models/warehouse');
const Product = require('../models/product');
const states = require('../config/states');

// Add a new warehouse
exports.addWarehouse = async (req, res) => {
  try {
    const { name, state, location, stockLimit } = req.body;

    // Find the corresponding state code
    const selectedState = states.find((s) => s.name === state);
    if (!selectedState) {
      return res.status(400).json({ error: 'Invalid state' });
    }

    // Generate the warehouseId using the state code and a random 4-digit number
    const warehouseId = selectedState.code + Math.floor(1000 + Math.random() * 9000);

    const warehouse = new Warehouse({
      warehouseId,
      name,
      state,
      location,
      stockLimit,
    });

    await warehouse.save();
    res.status(201).json(warehouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add the warehouse' });
  }
};

// Get all warehouses
exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch warehouses' });
  }
};

// Get warehouses by state code
exports.getWarehousesByState = async (req, res) => {
  try {
    const { stateCode } = req.params;

    // Find the corresponding state name
    const selectedState = states.find((s) => s.code === stateCode);
    if (!selectedState) {
      return res.status(400).json({ error: 'Invalid state code' });
    }

    const warehouses = await Warehouse.find({ state: selectedState.name });
    res.json(warehouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch warehouses' });
  }
};

// Add stock to a warehouse
exports.addStock = async (req, res) => {
  try {
    const { sku_id, warehouseId, quantity } = req.body;

    // Find the warehouse
    const warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }

    // Find the product
    const product = await Product.findOne({ sku_id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the warehouse already has the product
    const existingProductIndex = warehouse.products.findIndex(
      (wp) => wp.product.toString() === product._id.toString()
    );

    // If the product is already in the warehouse, update the quantity
    if (existingProductIndex !== -1) {
      warehouse.products[existingProductIndex].quantity += quantity;
    } else {
      // If the product is not in the warehouse, add it with the quantity
      warehouse.products.push({ product: product._id, quantity });
    }

    // Check if the warehouse has a stock limit
    if (warehouse.stockLimit !== -1) {
      // Calculate the available stock space in the warehouse
      const availableSpace = warehouse.stockLimit - getWarehouseStockQuantity(warehouse);

      // Check if the shipment exceeds the stock limit
      if (availableSpace < quantity) {
        return res.status(400).json({ error: 'Shipment exceeds stock limit' });
      }
    }

    await warehouse.save();

    // Update the stockQuantity in the product schema
    product.stockQuantity = await calculateProductStockQuantity(sku_id);
    await product.save();

    res.status(200).json({
      message: 'Stock added successfully',
      warehouse,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add stock' });
  }
};

// Helper function to calculate the total stock quantity in a warehouse
function getWarehouseStockQuantity(warehouse) {
  let totalQuantity = 0;
  for (const product of warehouse.products) {
    totalQuantity += product.quantity;
  }
  return totalQuantity;
}

// View states with code, number of warehouses, and total stock capacity
exports.viewStates = async (req, res) => {
  try {
    const stateData = [];

    for (const state of states) {
      const warehouses = await Warehouse.find({ state: state.name });
      let totalStockCapacity = 0;

      for (const warehouse of warehouses) {
        totalStockCapacity += warehouse.stockLimit;
      }

      stateData.push({
        state: state.name,
        code: state.code,
        warehouseCount: warehouses.length,
        totalStockCapacity,
      });
    }

    res.json(stateData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch state data' });
  }
};

// Get warehouse information by warehouseId
exports.getWarehouseInfo = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    // Find the warehouse
    const warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }

    // Get all available SKUs in the warehouse
    const skus = await Product.find({
      _id: { $in: warehouse.products.map((wp) => wp.product) },
    });

    res.json({
      warehouseId: warehouse.warehouseId,
      availableSKUs: skus,
      availableStorage: warehouse.stockLimit !== -1 ? warehouse.stockLimit - getWarehouseStockQuantity(warehouse) : -1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch warehouse information' });
  }
};

// Helper function to calculate the total stock quantity of a product across all warehouses
async function calculateProductStockQuantity(sku_id) {
  const warehouses = await Warehouse.find({
    'products.product': { $exists: true },
    'products.quantity': { $gt: 0 },
  }).select('products.quantity');

  let stockQuantity = 0;
  for (const warehouse of warehouses) {
    for (const product of warehouse.products) {
      const prod = await Product.findOne({ _id: product.product, sku_id });
      if (prod) {
        stockQuantity += product.quantity;
      }
    }
  }

  return stockQuantity;
}
