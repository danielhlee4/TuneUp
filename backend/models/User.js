const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    instruments: {
      type: [String],
    },
    genres: {
      type: [String],
    },
    address: {
      type: String,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
    },
    hostedTuneUps: [
      {
        type: Schema.Types.ObjectId,
        ref: "TuneUp",
      },
    ],
    joinedTuneUps: [
      {
        type: Schema.Types.ObjectId,
        ref: "TuneUp",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
