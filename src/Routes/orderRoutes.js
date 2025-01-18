// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../Controller/orderController');

// Route for creating an order
router.post('/create', orderController.createOrder);
router.get('/:userId', orderController.getUserOrders);

// Route for retrieving a single order by ID
router.get('/:id', orderController.getOrderById);

// Route for updating order status
router.patch('/:id/status', orderController.updateOrderStatus);

// Route for updating payment status
router.patch('/:id/payment', orderController.updatePaymentStatus);


module.exports = router;
