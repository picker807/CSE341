const express = require('express');
const router = express.Router();
const middleware = require("../middleware/middleware");

const tasksController = require('../controllers/taskController');

router.post   ('/', tasksController.createTask);
router.get    ('/', tasksController.getAllTasks);
router.get    ('/:id', middleware.validateId, tasksController.getTaskById);
router.put    ('/:id', middleware.validateId, tasksController.updateTask);
router.delete ('/:id', middleware.validateId, tasksController.deleteTask);

module.exports = router;