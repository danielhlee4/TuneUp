const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateLoginInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to login a user
const validateLoginInput = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Email is invalid'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be between 6 and 30 characters'),
  handleValidationErrors
];

// think about using validations below this line in the users patch route 

const validateUserData = [
  check('instruments')
    .optional()
    .isArray()
    .withMessage('Instruments must be an array of strings'),
  check('genres')
    .optional()
    .isArray()
    .withMessage('Genres must be an array of strings'),
  check('zipcode')
    .optional()
    .isPostalCode()
    .withMessage('Zipcode must be a valid postal code'),
]

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {  // Assuming you're using Passport.js
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

module.exports = validateLoginInput;