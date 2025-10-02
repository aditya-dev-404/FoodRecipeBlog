const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // lowercase
  if (!authHeader) {
    return res.status(401).json({ error: 'Login to share your recipe!' });
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token!' });
    }
    req.userId = decoded.userId; // store user id for routes
    next(); // pass control to the route
  });
};

module.exports = verifyToken;
