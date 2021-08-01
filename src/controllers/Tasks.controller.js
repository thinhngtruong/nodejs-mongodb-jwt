const taskService = require("../services/Tasks.service");

const create = async (req, res) => {
    const { title, body } = req.body;
    const userId = req.user._id;
    console.log(userId)

    taskService.createTask({ title, body, userId })
        .then(newTask => res.json(newTask))
        .catch(err => {
            res.status(500).json(err);
        });
}

const findAll = async (req, res) => {
    taskService.getAllTasks()
        .then((tasks) => {
            res.json(tasks);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

const findById = async (req, res) => {
    const { taskId } = req.params
    taskService.findTaskById(taskId)
        .then((task) => {
            res.json(task);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

module.exports = {
    create,
    findAll,
    findById
}