const { Router } = require('express');
const TaskController = require('../controllers/Tasks.controller');

const tasksRouter = Router({ mergeParams: true });

tasksRouter.post('/', TaskController.create);
tasksRouter.get('/', TaskController.findAll);
tasksRouter.get('/:taskId', TaskController.findById);
tasksRouter.delete('/:taskId', TaskController.deleteById);
tasksRouter.patch('/:taskId', TaskController.updateById);

module.exports = tasksRouter;
