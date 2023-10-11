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

module.exports = {
    createUserQuery: (userData) => {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    },
    getAllUsersQuery: () => {
        // Implement logic to retrieve all users
    },
    getUserByIdQuery: (userId) => {
        // Implement logic to retrieve a user by ID
    },
    updateUserQuery: (userId, userData) => {
        // Implement logic to update a user
    },
    deleteUserQuery: (userId) => {
        // Implement logic to delete a user
    }
};
