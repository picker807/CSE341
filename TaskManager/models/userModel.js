const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasksAssigned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task', // Reference to the "Task" model
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
