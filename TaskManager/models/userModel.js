const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    fullName: String,
    email: String,
    password: String,
    tasksAssigned: [String]
});



module.exports = mongoose.model('users', userSchema);