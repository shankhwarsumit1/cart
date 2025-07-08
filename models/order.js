const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: Object,
    required: true
  },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  user: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);