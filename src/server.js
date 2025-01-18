const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/config');
const router = require('./Routes'); // Import routes here

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/api', router);  // Use the router for all API routes

app.listen(port, async () => {
  await connectDB();
  console.log(`server started at http://localhost:${port}`);
});
