const mongoose = require('mongoose');
const validator = require('validator'); // For email validation
const bcrypt = require('bcryptjs'); // To hash passwords

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
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

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;

  // Check if the password and confirm password match
  if (user.isModified('password') && user.password !== user.cpassword) {
    throw new Error('Passwords do not match');
  }

  // Hash the password only if it's modified or is a new user
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Method to compare passwords (for login purposes)
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  const user = this;
  return bcrypt.compare(enteredPassword, user.password);
};

// Create and export the model
const User = mongoose.model('User', userSchema);

module.exports = User;
