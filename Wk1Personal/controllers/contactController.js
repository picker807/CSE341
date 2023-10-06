const {
	queryAllContacts,
	querySingleContact,
	createContact,
	updateContact,
	deleteContactById,
	Contact
} = require("../models/contactModel.js");

// GET to get all contacts
async function handleAllContacts(req, res) { 
	try {
		const data = await queryAllContacts();

		// Send the response to the client
		res.json(data);
	} catch (error) {
		console.error("Error in handleAllContacts:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

// GET to get a contact by ID
async function handleSingleContact(req, res) {
	try {
		const id = req.params.id;
		const data = await querySingleContact(id);

		// Send the response to the client
		res.json(data);
	} catch (error) {
		console.error("Error in handleSingleContact:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

//POST a new contact to the db
async function addNewContact(req, res) {
	try {
		const { firstName, lastName, email, favoriteColor, birthday } = req.body;

		const newContact = await createContact(
			firstName,
			lastName,
			email,
			favoriteColor,
			birthday,
		);

		// return status 201 if successful
		res
			.status(201)
			.json({ message: "Contact created successfully", contact: newContact });
	} catch (error) {
		console.error("Error creating contact:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

// PUT to update a contact
async function updateContactById(req, res) {
	try {
		const { id } = req.params;
		const { firstName, lastName, email, favoriteColor, birthday } = req.body;

		const updatedContact = await updateContact(id, firstName, lastName, email, favoriteColor, birthday);
		console.log("updatedContact: ", updatedContact);
		// return status 404 if contact not found
		if (!updatedContact) {
			return res.status(404).json({ message: "Contact not found" });
		}
		// return status 204 if successful. No data returned since 204 means No Data
		return res.status(204).send();
	} catch (error) {
		console.error("Error updating contact: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

// DELETE to delete a contact by ID
async function deleteContact(req, res) {
	try {
		const { id } = req.params;
		const result = await deleteContactById(id);

		// return status 200 if successful
		res.status(200).json({ message: result });
	} catch (error) {
		console.error("Error deleting contact: ", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

module.exports = {
	handleAllContacts,
	handleSingleContact,
	addNewContact,
	updateContactById,
	deleteContact,
};
