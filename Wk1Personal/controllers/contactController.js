const { queryAllContacts, querySingleContact  } = require('../models/contactModel.js');

async function handleAllContacts(req, res) {
    try {
        const data = await queryAllContacts();
      
        // Send the response to the client
        res.json(data);
    } catch (error) {
        console.error('Error in handleAllContacts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleSingleContact(req, res) {
    try {
        const id = req.params.id;
        const data = await querySingleContact(id);
      
        // Send the response to the client
        res.json(data);
    } catch (error) {
        console.error('Error in handleSingleContact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    handleAllContacts, handleSingleContact
};