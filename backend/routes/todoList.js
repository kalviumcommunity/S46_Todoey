const express = require("express");

const Task = require("../models/taskModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find({}).sort({createdAt: -1});
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

router.put("/", (req, res) => {
  res.status(200).json({ PUT: "Put req sent" });
});

router.delete("/", (req, res) => {
  res.status(200).json({ DELETE: "Delete req sent" });
});

module.exports = router;
