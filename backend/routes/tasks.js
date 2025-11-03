import express from "express";
import Task from "../models/Task";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

//PROTECTS ROUTES - NEEDS JWT
router.use(authenticateToken);

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.status(200).json(tasks);
    console.log("Task fetched from endpoint successful");
  } catch (error) {
    res.status(500).json({ error: "Task fetching failed" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    const newTask = new Task({
      title,
      userId: req.userId,
    });

    await newTask.save();

    res.status(201).json(newTask);
    console.log("Task creation successful");
  } catch (error) {
    res.status(400).json({ error: "Task creation failed" });
  }
});

//UPDATE TASK FOR DONE OR NOT DONE
router.put("/:id", async (req, res) => {
  try {
    const { isDone } = req.body;

    const updateTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      { isDone },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found!" });
    }

    res.json(updateTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteTask = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
