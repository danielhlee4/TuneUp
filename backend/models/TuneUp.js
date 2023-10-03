const mongoose = require("mongoose");
const { Schema } = mongoose;

const tuneUpSchema = new Schema(
  {
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    connections: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pendingConnections: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TuneUp", tuneUpSchema);
