const express = require('express');
const router = express.Router();
const middleware = require("../middleware/middleware")

// Import your controllers
const userController = require('../controllers/userController');
const tasksController = require('../controllers/taskController');

// Routes for the "User" collection
router.post   ('/users', userController.createUser);
router.get    ('/users', userController.getAllUsers);
router.get    ('/users/:id', middleware.validateId, userController.getUserById);
router.put    ('/users/:id', middleware.validateId, userController.updateUser);
router.delete ('/users/:id', middleware.validateId, userController.deleteUser);

// Routes for the "Tasks" collection
router.post   ('/tasks', tasksController.createTask);
router.get    ('/tasks', tasksController.getAllTasks);
router.get    ('/tasks/:id', tasksController.getTaskById);
router.put    ('/tasks/:id', tasksController.updateTask);
router.delete ('/tasks/:id', tasksController.deleteTask);

module.exports = router;