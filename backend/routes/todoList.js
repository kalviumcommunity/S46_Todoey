const express = require('express');
const Task = require('../models/taskModel');
const { verifyToken } = require('../extras/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { token } = req.headers;
  if (token) {
    const { _id } = await verifyToken(token);
    const tasks = await Task.find({ userId: _id }).sort({ createdAt: -1 });
    res.status(200).send(tasks);
  }
});

router.post('/', async (req, res) => {
  const { task, token } = req.body;
  const { _id } = await verifyToken(token);

  try {
    const newTask = await Task.create({ task, isChecked: false, userId: _id });
    res.status(200).json({ POST: newTask });
  } catch (e) {
    console.log(`Error: ${e}`);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { updatedTask } = req.body;

  try {
    const task = await Task.findByIdAndUpdate({ _id: id }, updatedTask);
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({ _id: id });

  res.status(200).json(task);
});

module.exports = router;
