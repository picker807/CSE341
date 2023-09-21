const routes = require('express').Router();

//import controllers
const homeController = require('../controllers/homeController');

routes.get('/', homeController.handleHome);

module.exports = routes