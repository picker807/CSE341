const routes = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         favoriteColor:
 *           type: string
 *         birthday:
 *           type: string
 */



//import controllers
const homeController = require("../controllers/homeController");
const contactController = require("../controllers/contactController");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Display a name
 *     description: Display a name that is hard coded in the program.
 *     responses:
 *      description: Returns name of specific person hard coded in the program
 *       
 */
routes.get("/", homeController.handleHome);

/**
 * @swagger
 * /contacts:
 *      get:
 *          summary: Get all contacts
 *          description: Get all contacts and their information from the database
 *          responses:
 *              200:
 *                  description: A list of contacts in the contact schema format.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Contact'
 * 
 */
routes.get("/contacts", contactController.handleAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *  get:
 *      description: Get a single contact by their ID.
 *       parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the contact to update
 *         required: true
 *         type: string
 *      responses:
 *      200:
 *          description: A single contact corresponding to the ID provided
 *          content:
 *              application/json:
 *                  schema:
 *                  type: object
 *                  items:
 *                      $ref: '#/components/schemas/Contact'
 */
routes.get("/contacts/:id", contactController.handleSingleContact);
routes.post("/contacts", contactController.addNewContact);
routes.put("/contacts/:id", contactController.updateContactById);
routes.delete("/contacts/:id", contactController.deleteContact);


module.exports = routes;
