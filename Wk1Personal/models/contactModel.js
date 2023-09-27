const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

// MongoDB connection string
const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME;
let db;
let collection;

// Create a new MongoClient
const client = new MongoClient(url);

async function connectToMongo() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");
		db = client.db(dbName);
		collection = db.collection("contacts");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw error;
	}
}

// Function to query All
const queryAllContacts = async () => {
	try {
		const data = await collection.find().toArray();

		return data;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw error;
	}
};

//Function to query a single contact
const querySingleContact = async (id) => {
	try {
		const objectId = new ObjectId(id);

		const data = await collection.findOne({ _id: objectId });

		return data;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw error;
	}
};

// Function to create a new contact
const createContact = async (
	firstName,
	lastName,
	email,
	favoriteColor,
	birthday,
) => {
	try {
		const newContact = {
			firstName,
			lastName,
			email,
			favoriteColor,
			birthday,
		};

		const result = await collection.insertOne(newContact);

		return result;
	} catch (error) {
		throw error;
	}
};

//Function to update an existing contact by ID
const updateContact = async (id, updatedData) => {
	try {
		const objectId = new ObjectId(id);

		const result = await collection.findOneAndUpdate(
			{ _id: objectId },
			{ $set: updatedData },
			{ returnOriginal: false },
		);
		console.log(result);
		return result;
	} catch (error) {
		console.error("Error updating contact: ", error);
		throw error;
	}
};

// Function to delete a contact using id
const deleteContactById = async (id) => {
	try {
		const identifier = { _id: new ObjectId(id) };

		const result = await collection.deleteOne(identifier);

		return result.deletedCount;
	} catch (error) {
		console.error("Error deleting contact: ", error);
		throw error;
	}
};

connectToMongo();

module.exports = {
	queryAllContacts,
	querySingleContact,
	createContact,
	updateContact,
	deleteContactById,
};
