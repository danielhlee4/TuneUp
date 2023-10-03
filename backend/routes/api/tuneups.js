const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const TuneUp = mongoose.model("TuneUp");
const { restoreUser } = require("../../config/passport");

const {
  ensureAuthenticated,
  ensureEventHost,
} = require("../../validations/user.js");

router.get("/", async (req, res, next) => {
  try {
    const tuneUps = await TuneUp.find({});
    res.status(200).json(tuneUps);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const tuneUps = await TuneUp.find({ host: req.params.id });
    res.status(200).json(tuneUps);
  } catch (error) {
    next(error);
  }
});

router.post("/create", ensureAuthenticated, async (req, res, next) => {
  try {
    const { description, date, genre, address, zipcode } = req.body;
    const newTuneUp = new TuneUp({
      host: req.user._id,
      description,
      date,
      genre,
      address,
      zipcode,
      connections: [],
      pendingConnections: [],
    });
    await newTuneUp.save();
    res.status(201).json(newTuneUp);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  ensureAuthenticated,
  ensureEventHost,
  async (req, res, next) => {
    try {
      const updateData = {
        description: req.body.description,
        date: req.body.date,
        genre: req.body.genre,
        address: req.body.address,
        zipcode: req.body.zipcode,
        connections: req.body.connections,
        pendingConnections: req.body.pendingConnections,
      };
      const event = await TuneUp.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
      });
      res.json(event);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  ensureAuthenticated,
  ensureEventHost,
  async (req, res, next) => {
    try {
      const tuneUp = await TuneUp.findByIdAndDelete(req.params.id);
      if (!tuneUp) return res.status(404).json({ error: "TuneUp not found" });
      res.json({ message: "TuneUp deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/:id/join", ensureAuthenticated, async (req, res, next) => {
  try {
    const event = await TuneUp.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (
      !event.pendingConnections.includes(req.user._id) &&
      !event.connections.includes(req.user._id)
    ) {
      event.pendingConnections.push(req.user._id);
      await event.save();
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
