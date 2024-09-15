const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};

module.exports = auth;
