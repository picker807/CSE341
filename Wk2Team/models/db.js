const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB connection string
const uri = process.env.MONGODB_URI;

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Function to connect
async function connectDb() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db("cse341");
        const collection = db.collection('wk2team');
        const user = await collection.find({}).toArray();
        await client.close();
        console.log("Closed MongoDB Connection")
        const data = user[0].user
        return data;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}



module.exports = {
    connectDb
};

