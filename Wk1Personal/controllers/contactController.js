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
	/**
	 * #swagger.tags = ['Contacts']
	 * #swagger.summary = 'Get all contacts'
	 * #swagger.description = 'Retrieve a list of all contacts.'
	 * #swagger.responses[200] = {
	 *    description: 'List of contacts',
	 *    schema: {
	 *      $ref: '#/components/schemas/Contact'
	 *    }
	 * }
	 * #swagger.responses[500] = { description: 'Internal Server Error' }
	 */
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
	/**
	 * #swagger.tags = ['Contacts']
	 * #swagger.summary = 'Get one contact by ID'
	 * #swagger.description = 'Retrieve the contact associated with the ID provided.'
	 * #swagger.responses[200] = {
	 *    description: 'Single contact',
	 *    schema: {
	 *      $ref: '#/components/schemas/Contact'
	 *    }
	 * }
	 * #swagger.responses[500] = { description: 'Internal Server Error' }
	 */
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
	/*
	#swagger.tags = ['Contacts']
	#swagger.summary = 'Create a new contact'
	#swagger.description = 'Add a new contact with info provided by user'
	
	#swagger.parameters['body'] = {
	in: 'body',
	description: 'Contact information',
	required: true, // Indicates that the request body (Contact schema) is required
	schema: { $ref: "#/components/schemas/Contact" }}
	#swagger.responses[201] = { description: 'New contact info', schema: { $ref: "#/components/schemas/Contact" } }
	*/
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
	/*
	#swagger.tags = ['Contacts']
	#swagger.summary = 'Update one contact based on ID'
	#swagger.description = 'Update the contact matching the ID provided'
	#swagger.responses[200] = { description: 'Does not return any data', schema: { $ref: "#/components/schemas/Contact" } }
	#swagger.parameters['body'] = {
	in: 'body',
	description: 'information to be updated',
	required: true, // Indicates that the request body (Contact schema) is required
	schema: { $ref: "#/components/schemas/Contact" }
	}
	*/
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
	/*
	#swagger.tags = ['Contacts']
	#swagger.summary = 'Delete one contact'
	#swagger.description = 'Permanantly delete one contact associated with the ID provided'
	#swagger.responses[200] = { description: 'returns number of items deleted'}
	*/
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
