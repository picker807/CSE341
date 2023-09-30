const { body, validationResult } = require("express-validator");
const validate = {};

validate.contactValidationRules = () => [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
    body('birthday').isDate().withMessage('Invalid date format'),
];

module.exports = validate;