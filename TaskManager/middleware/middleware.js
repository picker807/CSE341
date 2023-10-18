const middleware = {
    validateId: (req, res, next) => {
        const userId = req.params.id;

        if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        next();
    },
    errorHandler: (error, req, res, next) => {
        // Custom error handling for unanticipated errors
        console.error(error);
        if (error.name === "ValidationError") {
            res.status(400).json({
                message: error.message || 'An error occurred while creating the user.'
            });
        }
        res.status(500).json({ error: 'Internal server error' });
    },
};

module.exports = middleware;
