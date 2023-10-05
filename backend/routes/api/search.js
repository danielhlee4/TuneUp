const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const TuneUp = mongoose.model("TuneUp");
const User = mongoose.model("User");

// expecting search route to look like this: /search?q=${query}

router.get("/", async (req, res, next) => {
  const query = req.query.q;
  console.log(query);
  try {
    // const userResults = await User.find({
    //   $or: [
    //     { firstName: new RegExp(query, "i") },
    //     { lastName: new RegExp(query, "i") },
    //     { instruments: new RegExp(query, "i") },
    //   ],
    // });

    const tuneUpResults = await TuneUp.find({
      $or: [
        { genre: new RegExp(query, "i") },
        { instruments: new RegExp(query, "i") },
      ],
    });

    // const combinedResults = {
    //   users: userResults,
    //   tuneUp: tuneUpResults,
    // };

    res.json(tuneUpResults);
  } catch (error) {
    res.status(500).send({ message: "Error during search", error });
  }
});

module.exports = router;
