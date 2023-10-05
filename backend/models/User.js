const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      index: "text",
    },
    lastName: {
      type: String,
      required: true,
      index: "text",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    instruments: {
      type: [String],
      index: true,
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
