const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("MongoDB Connected ...");
  } catch (err) {
    console.log("not connected");
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
