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
  "2550 Victory Blvd, Staten Island, NY 10314",
  "35-32 21st St, Long Island City, NY 11106",
  "25 Waverly Pl, New York, NY 10003",
  "133 Macdougal St, New York, NY 10012",
  "101 Johnson St, Brooklyn, NY 11201",
  "203 W 115th St, New York, NY 10026",
  "504 Main St, New York, NY 10044",
  "128 Pierrepont Street Brooklyn, NY 11201",
  "222 Jersey City Blvd, Jersey City, NJ 07305",
  "8 Thomas S. Boyland St, Brooklyn, NY 11233",
  "2270 Clove Rd, Staten Island, NY 10305",
  "484 Bergen Blvd, Ridgefield, NJ 07657",
  "3506 Park Ave, Weehawken, NJ 07086",
  "116 E Fordham Rd, Bronx, NY 10468",
  "2725 86th St, Brooklyn, NY 11223",
  "92-10 Atlantic Ave, Queens, NY 11416",
  "68-18 Main St, Flushing, NY 11367",
  "33-45 Francis Lewis Blvd, Queens, NY 11358",
  "880 Coney Island Ave, Brooklyn, NY 11218",
  "4 New York Plaza, New York, NY 10004",
];

const instruments = [
  "Drums",
  "Trombone",
  "Piano",
  "Guitar",
  "Trumpet",
  "Flute",
  "Cello",
  "Violin",
  "Saxophone",
  "Clarinet",
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
      email: `demo${i}@demo.com`,
      hashedPassword: bcrypt.hashSync("password", 10),
      profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
      address: addresses[i],
      instruments: instruments[i],
      genres: [faker.music.genre(), faker.music.genre()],
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
        status: "true",
        date: faker.date.future(),
        genre: faker.music.genre(),
        address: addresses[i + 10],
        connections: [],
        pendingConnections: [],
      });
      await hostedTuneUp.save();

      // Update hostedTuneUps for the user
      user.hostedTuneUps.push(hostedTuneUp._id);
      await user.save();

      // User joins a TuneUp hosted by another user
      const otherUserIndex = (i + 1) % createdUsers.length; // Ensure the user joins another user's TuneUp
      const otherAttendeeIndex = (i + 2) % createdUsers.length; // Add another user to tuneup
      const otherUser = createdUsers[otherUserIndex];
      const otherAttendeeUser = createdUsers[otherAttendeeIndex];
      const joinedTuneUp = new TuneUp({
        host: otherUser._id,
        description: faker.lorem.paragraph(),
        status: "true",
        instruments: instruments
          .slice(Math.floor(Math.random() * (instruments.length - 1)))
          .splice(0, 4),
        date: faker.date.future(),
        genre: faker.music.genre(),
        address: addresses[i],
        connections: [user._id, otherAttendeeUser._id],
        pendingConnections: [],
      });
      await joinedTuneUp.save();

      // Update joinedTuneUps for the user
      otherUser.hostedTuneUps.push(joinedTuneUp._id);
      otherAttendeeUser.joinedTuneUps.push(joinedTuneUp._id);
      user.joinedTuneUps.push(joinedTuneUp._id);
      await otherUser.save();
      await otherAttendeeUser.save();
      await user.save();
    }

    console.log("Done!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
};
