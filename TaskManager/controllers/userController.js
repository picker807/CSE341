const {
    createUserQuery,
    getAllUsersQuery,
    getUserByIdQuery,
    updateUserQuery,
    deleteUserQuery } = require('../models/userModel');

// Create a new user
async function createUser(req, res) {
    try {
        const newUser = await createUserQuery(req.body);

        if (newUser) {
            res.status(201).json(newUser);
        } else {
            res.status(400).json({ error: 'Bad Request' });
        }
        
    } catch (error) {
        res.status(500).json({ error: 'User creation failed' });
    }
}

// Get all users
async function getAllUsers(req, res) {
    try {
        const users = await getAllUsersQuery();

        if (users) {
            res.status(200).json(users); // 200 OK
        } else {
            res.status(404).json({ error: 'Not Found' }); // 404 Not Found
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
}

// Get a user by ID
async function getUserById(req, res) {
    try {
        const user = await getUserByIdQuery(req.params.id);

        if (user) {
            return res.status(200).json(user); // 200 OK
        } else {
            return res.status(404).json({ error: 'Not Found' }); // 404 Not Found
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
}

// Update a user
async function updateUser(req, res) {
    try {
        const updatedUser = await updateUserQuery(req.params.id, req.body);
        if (updatedUser) {
            return res.status(200).json(updatedUser); // 200 OK
        } else {
            return res.status(404).json({ error: 'Not Found' }); // 404 Not Found
        }
    } catch (error) {
        return res.status(400).json({ error: 'Bad Request' }); // 400 Bad Request
    }
}

// Delete a user
async function deleteUser(req, res) {
    try {
        const result = await deleteUserQuery(req.params.id);
        if (result.n === 1) {
            return res.status(204).send(); // 204 No Content
        } else {
            return res.status(404).json({ error: 'Not Found' }); // 404 Not Found
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser

}