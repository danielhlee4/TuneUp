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
    const { description, date, genre, address } = req.body;
    const newTuneUp = new TuneUp({
      host: req.user._id,
      description,
      date,
      genre,
      address,
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

      const removedAttendees = tuneUp.connections
        .map(String)
        .filter((attendee) => !req.body.connections.includes(attendee));

      const removedPromises = removedAttendees.map((attendeeId) =>
        User.findByIdAndUpdate(attendeeId, {
          $pull: { joinedTuneUps: tuneUp._id },
        })
      );

      const acceptedAttendees = req.body.connections
        ? req.body.connections
            .map(String)
            .filter(
              (attendee) => !tuneUp.connections.map(String).includes(attendee)
            )
        : [];

      const acceptedPromises = acceptedAttendees.map((attendeeId) =>
        User.findByIdAndUpdate(attendeeId, {
          $push: { joinedTuneUps: tuneUp._id },
        })
      );

      await Promise.all([...removedPromises, ...acceptedPromises]);

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

      await User.updateOne(
        { _id: tuneUp.host },
        {
          $pull: { hostedTuneUps: tuneUp._id },
        }
      );

      const removedAttendees = tuneUp.connections.map((attendeeId) =>
        User.findByIdAndUpdate(attendeeId, {
          $pull: { joinedTuneUps: tuneUp._id },
        })
      );

      await Promise.all([...removedAttendees]);

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

router.post("/:id/unjoin", ensureAuthenticated, async (req, res, next) => {
  try {
    const event = await TuneUp.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.pendingConnections.includes(req.user._id)) {
      event.pendingConnections.pull(req.user._id);
    }
    if (event.connections.includes(req.user._id)) {
      event.connections.pull(req.user._id);
    }

    await event.save();
    await User.updateOne(
      { _id: req.user._id },
      {
        $pull: { joinedTuneUps: event.id },
      }
    );

    res.json(event);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
