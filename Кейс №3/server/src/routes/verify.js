const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/verify', (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.send({ verified: true, userId: decoded.userId });
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' });
  }
});

module.exports = router;