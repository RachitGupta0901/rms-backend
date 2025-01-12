
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const createUser = async (req, res) => {
  const { email, password, cpassword, name } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: 'Invalid email' });
  }

  if (password !== cpassword) {
    return res.status(400).send({ error: 'Passwords do not match' });
  }

  if (password.length < 6) {
    return res.status(400).send({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({ email, password: hashedPassword, name });

    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error creating user' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      'your_jwt_secret_key', // Replace with your actual secret key
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send token in response (use header for actual authentication)
    res.status(200).send({ message: 'Login successful', token: token });
  } catch (error) {
    res.status(500).send({ error: 'Error logging in user' });
  }
};

module.exports = { createUser, loginUser };
