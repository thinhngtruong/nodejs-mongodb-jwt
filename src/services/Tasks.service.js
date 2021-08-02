const Task = require("../models/Tasks.model");

const getAllTasks = async () => {
	return Task.find({});
};

const createTask = async ({ title, body, userId }) => {
	return Task.create({
		title,
		body,
		completed: false,
		userId,
	});
}

const findTaskById = async (taskId) => {
	return Task.findById(taskId);
}

const deleteTaskById = async (taskId) => {
	return Task.findByIdAndRemove(taskId);
}

const updateTaskById = (taskID, task) => {
	if (task.completed) {
		task.completedAt = new Date();
	}
	return Task.findByIdAndUpdate(taskID, task, { new: true });
}

module.exports = {
	createTask,
	getAllTasks,
	findTaskById,
	updateTaskById,
	deleteTaskById,
};