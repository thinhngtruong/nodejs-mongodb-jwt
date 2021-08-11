const taskService = require('../services/Tasks.service');

const create = async (req, res, next) => {
  const { title, body } = req.body;
  const userId = req.user._id;

  try {
    const newTask = await taskService.createTask({ title, body, userId });
    res.json(newTask);
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await taskService.findTaskById(taskId);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await taskService.deleteTaskById(taskId);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  const { taskId } = req.params;
  const task = req.body;
  try {
    const updatedTask = await taskService.updateTaskById(taskId, task);
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  deleteById,
  updateById
};