const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');



const validateUserData = [
  check('instruments')
    .exists({ checkFalsy: true })
    .isArray()
    .custom(arr =>arr.length >= 1)
    .withMessage('Instruments cannot be blank'),
  check('genres')
    .exists({ checkFalsy: true })
    .isArray()
    .custom(arr =>arr.length >= 1)
    .withMessage('Genres cannot be blank'),
  check('zipcode')
    .optional()
    .isPostalCode("US")
    .withMessage('Zipcode must be a valid postal code'),
    handleValidationErrors
];

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {  
    return next();
  }
  res.status(401).json({ error: "User is not authenticated" });
}

function ensureAuthorized(req, res, next) {
  // Assuming `req.user` contains the authenticated user
  // and `req.params.id` is the ID of the user to be modified
  
  if (req.user._id.toString() === req.params.id) {
    return next();
  }
  res.status(403).json({ error: "User is not authorized" });
}

module.exports = {validateUserData, ensureAuthenticated, ensureAuthorized};