const db = require('../models');
const User  = db.user;

// Create a new user
async function createUser(req, res) {
   
    const user = new User(req.body);
    user
        .save()
        .then((data) => {
                res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'An error occurred while creating the user.'
            });
        });
}

// Get all users
async function getAllUsers(req, res) {
  
    User
        .find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'An error occurred while getting users.'
            });
        });
}

// Get a user by ID
async function getUserByUsername(req, res) {
    const username = req.params.username;
    User
        .find({ username: username })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
             res.status(500).send({
                 message: err.message || 'An error occurred while getting user.'
             });
        });
}
        
// Update a user
async function updateUser(req, res) {
    const username = req.params.username;
    User
        .updateOne({username: username}, {$set: req.body})
        .then((data) => {
            res.send(data);
        })
        .catch((err) =>{
            res.status(500).send({
            message: err.message || 'An error occurred while updating user info.'
            });
        });
}

// Delete a user
async function deleteUser(req, res) {
    const username = req.params.username;
    User
        .deleteOne({username: username})
        .then((data) => {
            res.send(data)
        })
        .catch ((err) => {
            res.status(500).send({
            message: err.message || 'An error occurred while updating user info.'
            });
        });
}

module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
    updateUser,
    deleteUser

}