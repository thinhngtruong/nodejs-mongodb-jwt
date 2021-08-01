const Task = require("../models/Tasks.model");

const getAllTasks = () => {
	return new Promise((resolve, reject) => {
		Task.find({}, (err, tasks) => {
			if (err) return reject(err);
			resolve(tasks);
		});
	});
};

const createTask = ({ title, body, userId }) => {
	return Task.create({
		title,
		body,
		completed: false,
		userId,
	});
}

const findTaskById = (taskId) => {
	return new Promise((resolve, reject) => {
		Task.findById(taskId, (err, task) => {
			if (err) {
				return reject(err);
			}
			resolve(task);
		});
	});
}

const deleteTaskById = (taskId) => {
	return new Promise((resolve, reject) => {
		Task.findByIdAndRemove(taskId, (err, listTask) => {
			if (err) {
				return reject(err);
			}
			resolve(listTask);
		});
	});
}

const updateTaskById = (taskID, task) => {
	return new Promise((resolve, reject) => {
		if (task.completed) {
			task.completedAt = new Date();
		}
		Task.findByIdAndUpdate(taskID, task, (err, updatedTask) => {
			if (err) return reject(err);
			resolve(updatedTask);
		});
	});
}

module.exports = {
	createTask,
	getAllTasks,
	findTaskById,
	updateTaskById,
	deleteTaskById,
};