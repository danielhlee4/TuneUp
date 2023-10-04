// Import necessary modules and models
require("dotenv").config();
const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const TuneUp = require("../models/TuneUp");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const DEFAULT_PROFILE_IMAGE_URL =
  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1696436645~exp=1696437245~hmac=f5eeb83ab6796097ab060cc9d3919660dcf9cea7efea0e2087504a5a007d4cd0";
const NUM_SEED_USERS = 10;
const addresses = [
  "400 Broome St, New York, NY 10013",
  "20 Cooper Square, New York, NY 10003",
  "25 Waverly Pl, New York, NY 10003",
  "133 Macdougal St, New York, NY 10012",
  "101 Johnson St, Brooklyn, NY 11201",
  "721 Broadway, New York, NY 10003",
  "70 Washington Square South, New York, NY 10012",
  "838 Broadway, New York, NY 10003",
  "29 Washington Pl, New York, NY 10003",
  "36 East 8th Street, New York, NY 10003",
];

// Create users
const users = [];
for (let i = 0; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User({
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync("password", 10),
      profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
      address: addresses[i],
      hostedTuneUps: [],
      joinedTuneUps: [],
    })
  );
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    insertSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = async () => {
  try {
    console.log("Resetting db and seeding users and TuneUps...");

    // Drop existing collections
    await Promise.all([User.deleteMany({}), TuneUp.deleteMany({})]);

    // Insert users
    const createdUsers = await User.insertMany(users);

    // Create TuneUps
    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i];

      // User hosts a TuneUp
      const hostedTuneUp = new TuneUp({
        host: user._id,
        description: faker.lorem.paragraph(),
        date: faker.date.future(),
        genre: faker.music.genre(),
        address: addresses[i],
        zipcode: addresses[i].split(", ")[2].slice(3),
        connections: [],
        pendingConnections: [],
      });
      await hostedTuneUp.save();

      // Update hostedTuneUps for the user
      user.hostedTuneUps.push(hostedTuneUp._id);
      await user.save();

      // User joins a TuneUp hosted by another user
      const otherUserIndex = (i + 1) % createdUsers.length; // Ensure the user joins another user's TuneUp
      const otherUser = createdUsers[otherUserIndex];
      const joinedTuneUp = new TuneUp({
        host: otherUser._id,
        description: faker.lorem.paragraph(),
        date: faker.date.future(),
        genre: faker.music.genre(),
        address: otherUser.address,
        zipcode: otherUser.address.split(", ")[2].slice(3),
        connections: [user._id],
        pendingConnections: [],
      });
      await joinedTuneUp.save();

      // Update joinedTuneUps for the user
      user.joinedTuneUps.push(joinedTuneUp._id);
      await user.save();
    }

    console.log("Done!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
};
