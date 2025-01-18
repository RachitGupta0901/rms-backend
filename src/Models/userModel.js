const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Password must be at least 6 characters
    },
    name: {
      type: String,
      required: true, // Name is required
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);


const User = mongoose.model('User', userSchema);

module.exports = User;
