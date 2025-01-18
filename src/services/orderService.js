// services/orderService.js

const Product = require('../Models/productModal');
const Order = require('../Models/orderModal');

// Service to handle order creation
exports.createOrder = async (userId, items, shippingAddress, paymentMethod) => {
  // Fetch products and validate stock
  const productIds = items.map(item => item.product);
  const products = await Product.find({ '_id': { $in: productIds } });

  if (products.length !== productIds.length) {
    throw new Error('Some products not found');
  }

  let totalAmount = 0;
  const updatedStockItems = [];

  // Calculate total amount and check stock availability
  for (const item of items) {
    const product = products.find(p => p._id.toString() === item.product);
    if (!product) {
      throw new Error(`Product with ID ${item.product} not found`);
    }

    if (product.stockQuantity < item.quantity) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }

    totalAmount += product.price * item.quantity;

    updatedStockItems.push({
      product: item.product,
      quantity: item.quantity,
      price: product.price,
    });
  }

  // Create the order
  const order = new Order({
    user: userId,
    items: updatedStockItems,
    totalAmount,
    shippingAddress,
    paymentMethod,
    orderStatus: 'Pending',
    paymentStatus: 'Pending',
  });

  // Save the order and update product stock
  await order.save();
  
  for (const item of updatedStockItems) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stockQuantity: -item.quantity },
    });
  }

  return order;
};

// Service to retrieve orders for a user
exports.getUserOrders = async (userId) => {
  return Order.find({ user: userId }).populate('items.product');
};

// Service to retrieve a specific order by ID
exports.getOrderById = async (orderId) => {
  return Order.findById(orderId).populate('items.product');
};

// Service to update the order status
exports.updateOrderStatus = async (orderId, status) => {
  const validStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }

  return Order.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true });
};

// Service to update the payment status
exports.updatePaymentStatus = async (orderId, paymentStatus) => {
  const validPaymentStatuses = ['Pending', 'Paid', 'Failed'];
  if (!validPaymentStatuses.includes(paymentStatus)) {
    throw new Error('Invalid payment status');
  }

  return Order.findByIdAndUpdate(orderId, { paymentStatus }, { new: true });
};
