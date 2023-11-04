const db = require('../models');
const Task = db.task;

// Create a new task
async function createTask (req, res, next) {
    const task = new Task(req.body);
    task
        .save()
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            if(err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occured while creating the task.'
                });
            } else {
                next(err);
            }
        });
}

async function getAllTasks(req, res, next) {
  
    Task
        .find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occurred while retrieving tasks.'
                });
            } else {
                next(err);
            }
        });
}

// Get a task by ID
async function getTaskById (req, res, next) {
   const id = req.params.id;
    Task
        .find({ _id: id })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
             });
};

// Update a task
async function updateTask (req, res, next)  {
    try {
        const id = req.params.id;

        const validationError = await Task.validate(req.body);
        if (validationError) {
            return res.status(400).json({ error: validationError.message });
        }

        Task
            .updateOne({ _id: id }, { $set: req.body })
            .then((data) => {
                res.status(204).send(data);
            })
    } catch (err) {
        next(err);
    }
}

// Delete a task
async function deleteTask(req, res) {
    const id = req.params.id;
    User
        .deleteOne({ _id: id})
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}