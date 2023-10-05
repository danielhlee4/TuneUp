const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");
const mongoose = require("mongoose");
const TuneUp = mongoose.model("TuneUp");

const validateUserData = [
  check("instruments")
    .exists({ checkFalsy: true })
    .isArray()
    .custom((arr) => arr.length >= 1)
    .withMessage("Instruments cannot be blank"),
  check("genres")
    .exists({ checkFalsy: true })
    .isArray()
    .custom((arr) => arr.length >= 1)
    .withMessage("Genres cannot be blank"),
  handleValidationErrors,
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

async function ensureEventHost(req, res, next) {
  try {
    const event = await TuneUp.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (String(event.host) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "User not authorized to delete this event" });
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateUserData,
  ensureAuthenticated,
  ensureAuthorized,
  ensureEventHost,
};
