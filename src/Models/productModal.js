// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  sizes: [{
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL'], // Example size options
    required: true
  }],
  colors: [{
    type: String,
    required: true
  }],
  stockQuantity: {
    type: Number,
    required: true,
    default: 0
  },
  images: [{
    type: String, // URL to product images
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
