
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/config');



dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());





app.listen(port, async () => {
  await connectDB();
  console.log(`server started at  http://localhost:${port}`);
});