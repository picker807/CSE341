const db = require('../models');
const User  = db.user;

// Create a new user
async function createUser(req, res, next) {
   
    const user = new User(req.body);

    user
        .save()
        .then((data) => {
                res.status(201).send(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occurred while creating the user.'
                }); 
            } else {
                next(err);
            }
        });
}

// Get all users
async function getAllUsers(req, res, next) {
  
    User
        .find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).json({
                    message: err.message || 'An error occurred while updating the user.'
                });
            } else {
                next(err);
            }
        });
}

// Get a user by ID
async function getUserById(req, res, next) {
    const id = req.params.id;
    User
        .find({ _id: id })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
             });
        };

        
// Update a user
async function updateUser(req, res, next) {
    try {
        const id = req.params.id;

        const validationError = await User.validate(req.body);
        if (validationError) {
            console.log("This One:  ", validationError);
            return res.status(400).json({ error: validationError.message });
        }

        User
            .updateOne({ _id: id }, { $set: req.body })
            .then((data) => {
                res.status(204).send(data);
            })
    } catch (err) {
        next(err);
    }
    
}

// Delete a user
async function deleteUser(req, res) {
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
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}