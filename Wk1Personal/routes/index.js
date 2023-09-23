const routes = require('express').Router();

//import controllers
const homeController = require('../controllers/homeController');
const contactController = require('../controllers/contactController');

routes.get('/', homeController.handleHome);
routes.get('/contacts', contactController.handleAllContacts);
routes.get('/contacts/:id', contactController.handleSingleContact)

module.exports = routes