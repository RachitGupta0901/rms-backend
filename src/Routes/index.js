const express = require('express');
const userRouter = require('./userRoutes');
const orderRouter = require('./orderRoutes'); // Import the user routes here
const router = express.Router();  // Declare your router once

router.use('/user', userRouter);  // This will handle all `/api/user` routes
router.use("/order",orderRouter);

module.exports = router;
