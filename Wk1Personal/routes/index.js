const routes = require("express").Router();

//import controllers
const homeController = require("../controllers/homeController");
const contactController = require("../controllers/contactController");

routes.get("/", homeController.handleHome);
routes.get("/contacts", contactController.handleAllContacts);
routes.get("/contacts/:id", contactController.handleSingleContact);
routes.post("/contacts/new", contactController.addNewContact);
routes.put("/contacts/:id", contactController.updateContactById);
routes.delete("/contacts/:id", contactController.deleteContact);

module.exports = routes;
