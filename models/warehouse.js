const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  warehouseId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
  location: { type: String, required: true },
  stockLimit: { type: Number, default: -1 },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
