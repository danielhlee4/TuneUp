const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const TuneUp = mongoose.model("TuneUp");
const User = mongoose.model("User");

const {
  ensureAuthenticated,
  ensureEventHost,
} = require("../../validations/user.js");

router.get("/", async (req, res, next) => {
  try {
    const tuneUps = await TuneUp.find({})
      .populate("connections")
      .populate("pendingConnections");
    res.status(200).json(tuneUps);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const tuneUp = await TuneUp.findById(req.params.id);
    res.status(200).json(tuneUp);
  } catch (error) {
    next(error);
  }
});

router.post("/create", ensureAuthenticated, async (req, res, next) => {
  try {
    const { description, date, genre, address, instruments, status } = req.body;
    const newTuneUp = new TuneUp({
      host: req.user._id,
      description,
      date,
      genre,
      address,
      instruments,
      status,
      connections: [],
      pendingConnections: [],
    });
    await newTuneUp.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { hostedTuneUps: newTuneUp._id },
    });

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
        ...(req.body.description && { description: req.body.description }),
        ...(req.body.date && { date: req.body.date }),
        ...(req.body.genre && { genre: req.body.genre }),
        ...(req.body.instruments && { instruments: req.body.instruments }),
        ...(req.body.status && { status: req.body.status }),
        ...(req.body.address && { address: req.body.address }),
        ...(req.body.connections && { connections: req.body.connections }),
        ...(req.body.pendingConnections && {
          pendingConnections: req.body.pendingConnections,
        }),
      };

      const tuneUp = await TuneUp.findById(req.params.id);

      const removedUsers = tuneUp.connections
        .map(String)
        .filter((user) => !req.body.connections.includes(user));

      const removedPromises = removedUsers.map((userId) =>
        User.findByIdAndUpdate(userId, {
          $pull: { joinedTuneUps: tuneUp._id, requestedTuneUps: tuneUp._id },
        })
      );

      const acceptedUsers = req.body.connections
        ? req.body.connections
            .map(String)
            .filter((user) => !tuneUp.connections.map(String).includes(user))
        : [];

      const acceptedPromises = acceptedUsers.map((userId) =>
        User.findByIdAndUpdate(userId, {
          $push: { joinedTuneUps: tuneUp._id },
          $pull: { requestedTuneUps: tuneUp._id },
        })
      );

      await Promise.all([...removedPromises, ...acceptedPromises]);

      const updateTuneUp = await TuneUp.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

      res.json(updateTuneUp);
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

      await User.updateOne(
        { _id: tuneUp.host },
        {
          $pull: { hostedTuneUps: tuneUp._id },
        }
      );

      const removedUsers = tuneUp.connections.map((userId) =>
        User.findByIdAndUpdate(userId, {
          $pull: { joinedTuneUps: tuneUp._id, requestedTuneUps: tuneUp._id },
        })
      );

      await Promise.all([...removedUsers]);

      res.json({ message: "TuneUp deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/:id/join", ensureAuthenticated, async (req, res, next) => {
  try {
    const tuneUp = await TuneUp.findById(req.params.id);
    if (!tuneUp) {
      return res.status(404).json({ error: "TuneUp not found" });
    }
    if (
      !tuneUp.pendingConnections.includes(req.user._id) &&
      !tuneUp.connections.includes(req.user._id)
    ) {
      tuneUp.pendingConnections.push(req.user._id);
      user.requestedTuneUps.push(tuneUp._id);
      await user.save();
      await tuneUp.save();
    }

    res.json(tuneUp);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/unjoin", ensureAuthenticated, async (req, res, next) => {
  try {
    const tuneUp = await TuneUp.findById(req.params.id);

    if (!tuneUp) {
      return res.status(404).json({ error: "TuneUp not found" });
    }

    if (tuneUp.pendingConnections.includes(req.user._id)) {
      tuneUp.pendingConnections.pull(req.user._id);
    }
    if (tuneUp.connections.includes(req.user._id)) {
      tuneUp.connections.pull(req.user._id);
    }

    await tuneUp.save();
    await User.updateOne(
      { _id: req.user._id },
      {
        $pull: { joinedTuneUps: tuneUp._id, requestedTuneUps: tuneUp._id },
      }
    );

    res.json(tuneUp);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
