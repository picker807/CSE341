const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
    },
    assignedTo: {
        type: Array
    },
    comments: [
        {
            text: {
                type: String,
            },
            timestamp: {
                type: Date,
            },
        },
    ],
    status: {
        type: String,
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
