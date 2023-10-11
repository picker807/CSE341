const express = require('express');
const router = express.Router();

// Import your controllers
const userController = require('./controllers/userController');
const tasksController = require('./controllers/tasksController');

// Routes for the "User" collection
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Routes for the "Tasks" collection
router.post('/tasks', tasksController.createTask);
router.get('/tasks', tasksController.getAllTasks);
router.get('/tasks/:id', tasksController.getTaskById);
router.put('/tasks/:id', tasksController.updateTask);
router.delete('/tasks/:id', tasksController.deleteTask);

module.exports = router;