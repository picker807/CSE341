const express = require('express');
const router = express.Router();
const professionalController = require('../controllers/professionalController');

// home route
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public');
});

// Define a REST endpoint to GET professional data
router.get('/professional', professionalController.getProfessionalData);

module.exports = router;
