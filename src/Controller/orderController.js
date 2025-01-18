// controllers/orderController.js

const orderService = require('../services/orderService');

// Controller for creating an order
exports.createOrder = async (req, res) => {
  const { userId, items, shippingAddress, paymentMethod } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Items array is required and cannot be empty.' });
  }
  try {
    // Step 1: Call the service to create the order
    const order = await orderService.createOrder(userId, items, shippingAddress, paymentMethod);

    // Step 2: Return the created order
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const orders = await orderService.getUserOrders(userId);
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Controller for retrieving a specific order by ID
  exports.getOrderById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await orderService.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Controller for updating order status
  exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const updatedOrder = await orderService.updateOrderStatus(id, status);
      res.status(200).json({ message: 'Order status updated', updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Controller for updating payment status
  exports.updatePaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { paymentStatus } = req.body;
  
    try {
      const updatedOrder = await orderService.updatePaymentStatus(id, paymentStatus);
      res.status(200).json({ message: 'Payment status updated', updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };