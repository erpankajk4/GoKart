const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku_id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  imageLink: { type: String },
  stockQuantity: { type: Number, default: 0 },
  inStockWarehouses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
    },
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
});

module.exports = mongoose.model('Product', productSchema);
