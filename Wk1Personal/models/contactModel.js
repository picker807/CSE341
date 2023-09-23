const { MongoClient, ObjectId } = require('mongodb');
require ('dotenv').config();

// MongoDB connection string
const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME

// Create a new MongoClient
const client = new MongoClient(url);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Function to query All
async function queryAllContacts() {
    try {
        const db = client.db(dbName);
        const collection = db.collection('contacts');

        const data = await collection.find().toArray();

        return data;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

//Function to query a single contact
async function querySingleContact(id) {
    try {
        const db = client.db(dbName);
        const collection = db.collection('contacts');
        const objectId = new ObjectId(id);

        const data = await collection.findOne({_id: objectId});
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

connectToMongo();

module.exports = {
    queryAllContacts, querySingleContact
};
