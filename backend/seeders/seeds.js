// require("dotenv").config();
// const mongoose = require("mongoose");
// const { mongoURI: db } = require("../config/keys.js");
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const { faker } = require("@faker-js/faker");
// const DEFAULT_PROFILE_IMAGE_URL =
//   "https://tuneup-mern-seeds.s3.amazonaws.com/public/blank-profile-picture-973460_1280.png";
// const NUM_SEED_USERS = 10;
// // Create users
// const users = [];
// users.push(
//   new User({
//     firstName: "demo-user",
//     lastName: "test",
//     email: "demo-user@appacademy.io",
//     hashedPassword: bcrypt.hashSync("starwars", 10),
//     profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
//     hostedTuneUps: [],
//     joinedTuneUps: [],
//   })
// );
// for (let i = 1; i < NUM_SEED_USERS; i++) {
//   const firstName = faker.name.firstName();
//   const lastName = faker.name.lastName();
//   users.push(
//     new User({
//       firstName: firstName,
//       lastName: lastName,
//       email: faker.internet.email(firstName, lastName),
//       hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
//       profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
//       hostedTuneUps: [],
//       joinedTuneUps: [],
//     })
//   );
// }
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => {
//     console.log("Connected to MongoDB successfully");
//     insertSeeds();
//   })
//   .catch((err) => {
//     console.error(err.stack);
//     process.exit(1);
//   });
// const insertSeeds = () => {
//   console.log("Resetting db and seeding users and tweets...");
//   User.collection
//     .drop()
//     .then(() => User.insertMany(users))
//     .then(() => {
//       console.log("Done!");
//       mongoose.disconnect();
//     })
//     .catch((err) => {
//       console.error(err.stack);
//       process.exit(1);
//     });
// };
// module.exports = DEFAULT_PROFILE_IMAGE_URL;

// Import necessary modules and models
require("dotenv").config();
const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const TuneUp = require("../models/TuneUp");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const DEFAULT_PROFILE_IMAGE_URL =
  "https://tuneup-mern-seeds.s3.amazonaws.com/public/blank-profile-picture-973460_1280.png";
const NUM_SEED_USERS = 10;

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
        address: faker.address.streetAddress(),
        zipcode: faker.address.zipCode(),
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
        address: faker.address.streetAddress(),
        zipcode: faker.address.zipCode(),
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
