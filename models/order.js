const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  productName: { type: String, required: true },
  sku_id: { type: String, required: true },
  fulfillmentStatus: { type: String, required: true },
  linkedWarehouse: { type: String }
});

module.exports = mongoose.model('Order', orderSchema);
