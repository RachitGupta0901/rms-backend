// userRoutes.js
const express = require('express');
const router = new express.Router();
const { createUser, loginUser } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware'); // Adjust path to authMiddleware

// Route to create a user (No authentication required)
router.post('/register', createUser);

// Route to login a user (No authentication required)
router.post('/login', loginUser);

// Example of a protected route (authentication required)
router.get('/profile', authenticate, (req, res) => {
  // If the user is authenticated, `req.user` will be populated
  res.status(200).send({ message: 'Protected profile route', user: req.user });
});

module.exports = router;
