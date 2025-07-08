const Order = require('../models/order');

// Get all orders for user
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ 'user.userId': req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { items, user } = req.body;
    const order = new Order({ items, user });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message})}}