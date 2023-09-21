
const { connectDb, closeDb } = require('../models/db.js');

async function getProfessionalData(req, res) {
    try {
        const data = await connectDb();
        
        console.log(data);
      
        // Send the response to the client
        res.json(data);
    } catch (error) {
        console.error('Error in getProfessionalData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getProfessionalData,
};
