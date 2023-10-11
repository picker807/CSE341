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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the "User" model
    },
    comments: [
        {
            text: {
                type: String,
            },
            user: {
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
