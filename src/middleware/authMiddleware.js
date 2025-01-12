// authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('auth-token'); // Look for the token in 'auth-token' header

  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'your_jwt_secret_key'); // Replace with your secret key

    req.user = decoded; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).send({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
