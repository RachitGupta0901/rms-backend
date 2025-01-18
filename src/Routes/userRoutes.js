const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controller/userController'); // Import functions from controller

router.post('/signup', signup);  // Route for signup
router.post('/login', login);    // Route for login

module.exports = router;
