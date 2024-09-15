const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth'); // Middleware для проверки JWT

// Добавление задачи
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.userId });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Получение задач
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Редактирование задачи
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Удаление задачи
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
