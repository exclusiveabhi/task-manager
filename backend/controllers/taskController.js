// taskController.js
import Task from "../model/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId; // Ensure userId is set by authenticateToken middleware

    const task = new Task({ title, description, user: userId });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

export const getTasksByUser = async (req, res) => {
  try {
    const userId = req.userId; // Ensure userId is set by authenticateToken middleware

    const tasks = await Task.find({ user: userId });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};
