const mongoose = require('mongoose');
require('dotenv').config();

// .env variables
const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoURI = `mongodb://${mongoUsername}:${mongoPassword}@localhost:27017/your-database-name`;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Define Mongoose models here

module.exports = mongoose.connection; // Export the connection object
