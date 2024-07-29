const router = require("express").Router();
const passport = require("passport");

const Task = require("../models/tasks");
const config = require("../utils/config");

// Authorization
router.use(passport.authenticate("jwt", { session: false }));

// Fetching All Tasks
router.get(
  "/:userId",
  async (req, res) => {
    try {
      const tasks = await Task.find({ user_id: req.params.userId });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

// Add Task
router.post("/:userId", async (req, res) => {
  const body = req.body;
  try {
    const newTask = Task({
      text: body.text,
      day: body.day,
      reminder: body.reminder,
      user_id: req.params.userId,
    });
    const addedTask = await newTask.save();
    res.json(addedTask);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Toggle important
router.put("/:userId/:id", async (req, res) => {
  const body = req.body;
  const task = {
    reminder: body.reminder,
  };
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, task, {
    new: true,
  });

  res.json(updatedTask).status(204).end();
});

// Delete Task
router.delete("/:userId/:id", async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  res.json(deletedTask).status(204).end();
});

module.exports = router;
