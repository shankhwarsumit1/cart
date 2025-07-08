const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');

// Place an order from the user's cart
exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Prepare order items
    const orderItems = cart.items.map(item => ({
      product: {
        _id: item.productId._id,
        title: item.productId.title,
        price: item.productId.price,
        description: item.productId.description,
        imageUrl: item.productId.imageUrl
      },
      quantity: item.quantity
    }));

    // Create order
    const order = new Order({
      items: orderItems,
      user: {
        userId: cart.userId,
        name: req.body.name || 'Unknown'
      }
    });
    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders for a user
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