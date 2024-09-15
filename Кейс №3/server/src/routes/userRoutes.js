const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = new User({ username: req.body.username, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Логин
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
