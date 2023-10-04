const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const { loginUser, restoreUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const DEFAULT_PROFILE_IMAGE_URL = require("../../seeders/images");
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
// const { findById } = require('../../models/User');
const {
  validateUserData,
  ensureAuthenticated,
  ensureAuthorized,
} = require("../../validations/user.js");

router.get("/current", restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    profileImageUrl: req.user.profileImageUrl,
    instruments: req.body.instruments,
    genres: req.body.genres,
    zipcode: req.body.zipcode,
    address: req.body.address,
    hostedTuneUps: req.body.hostedTuneUps,
    joinedTuneUps: req.body.joinedTuneUps,
  });
});

// fetch all users from db and return as JSON
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// fetch a single user from db by their ID and return as JSON
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("hostedTuneUps")
      .populate("joinedTuneUps");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// delete a user
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

router.post("/register", validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    err.errors = errors;
    return next(err);
  }
  const profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;

  // Otherwise create a new user
  const newUser = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profileImageUrl: profileImageUrl,
    hostedTuneUps: [],
    joinedTuneUps: [],
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      } catch (err) {
        next(err);
      }
    });
  });
});

router.post("/login", validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.patch(
  "/:id",
  // ensureAuthenticated,
  // ensureAuthorized,
  validateUserData,
  singleMulterUpload("image"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = {
        ...(req.body.instruments && { instruments: req.body.instruments }),
        ...(req.body.genres && { genres: req.body.genres }),
        ...(req.body.zipcode && { zipcode: req.body.zipcode }),
        ...(req.body.address && { address: req.body.address }),
        ...(req.file && {
          profileImageUrl: await singleFileUpload({
            file: req.file,
            public: true,
          }),
        }),
      };

      const user = await User.findByIdAndUpdate(id, updateData, { new: true });

      if (!user) return res.status(404).json({ error: "User not found" });

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
