const express = require("express");

const Task = require("../models/taskModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });
  res.status(200).json(tasks);
});

router.post("/", async (req, res) => {
  const { task } = req.body;

  try {
    const newTask = await Task.create({ task, isChecked: false });
    res.status(200).json({ POST: newTask });
  } catch (e) {
    console.log(`Error: ${e}`);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { updatedTask } = req.body;

  try {
    const task = await Task.findByIdAndUpdate({ _id: id }, updatedTask);
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({ _id: id });

  res.status(200).json(task);
});

module.exports = router;
