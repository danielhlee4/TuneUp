require("dotenv").config();
const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const TuneUp = require("../models/TuneUp");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const DEFAULT_PROFILE_IMAGE_URL =
  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1696436645~exp=1696437245~hmac=f5eeb83ab6796097ab060cc9d3919660dcf9cea7efea0e2087504a5a007d4cd0";
const profileImageUrls = [
  "https://www.the74million.org/wp-content/uploads/2019/02/Good-News-orchestra.jpg",
  "https://media.ipassio.com/media/ckeditor_image/2023/06/13/pandit-ravi-shankar-on-facebook_QvNTweO.webp",
  "https://media.ipassio.com/media/ckeditor_image/2023/06/13/zakir-hussain-on-facebook.webp",
  "https://media.ipassio.com/media/ckeditor_image/2023/06/13/pandit-bhimsen-joshi-on-facebook.webp",
  "https://bandzoogle.com/files/3713/bzblog-why-serious-musicians-still-need-to-be-making-albums-main.jpg",
  "https://i0.wp.com/www.yesmagazine.org/wp-content/uploads/2020/10/black-classical-musicians.jpg?resize=1024%2C614&quality=45&ssl=1",
  "https://www.kennedy-center.org/globalassets/education/opportunities-for-artists/competitions--commissions/vsa-international-young-soloists/vsa-young-soloists-competition---soloist-piano-169.jpg?format=webp&width=1024&quality=70",
  "https://drummagazine.com/wp-content/uploads/2021/07/Phil-Collins-2-1.jpg",
  "https://flypaper.soundfly.com/wp-content/uploads/2016/11/image1-683x1024.jpg",
  "https://www.oswego.edu/news/sites/www.oswego.edu.news/files/styles/panopoly_image_original/public/chrisspinelli_pocketconcertos.jpg?itok=J4yLWQqd",
];
const NUM_SEED_USERS = 10;
const addresses = [
  "2550 Victory Blvd, Staten Island, NY 10314",
  "35-32 21st St, Long Island City, NY 11106",
  "25 Waverly Pl, New York, NY 10003",
  "133 Macdougal St, New York, NY 10012",
  "101 Johnson St, Brooklyn, NY 11201",
  "203 W 115th St, New York, NY 10026",
  "504 Main St, New York, NY 10044",
  "128 Pierrepont Street, Brooklyn, NY 11201",
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

const genres = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "R&B",
  "Country",
  "Electronic",
  "Jazz",
  "Classical",
  "Reggie",
  "Blues",
];

const instruments = [
  "Piano",
  "Guitar",
  "Violin",
  "Trumpet",
  "Flute",
  "Drums",
  "Saxophone",
  "Banjo",
  "Vocals",
  "Clarinet",
];

const descriptions = [
  "Strum, smash, or sing; it's time for the ultimate jam session!",
  "Join the musical melting pot where tunes collide and magic happens!",
  "Unleash your inner Mozart with fellow virtuosos. Let's make symphony!",
  "Riffs, beats, and harmonies unite! Be part of the tuneup sensation!",
  "Where melodies mingle and rhythms romp—your tuneup adventure awaits!",
  "Get in the groove! It's about the music, camaraderie, and spontaneous harmonies!",
  "Calling all melody makers for a tuneup filled with zest, zeal, and zing!",
  "Strings, percussions, and keys galore! Dive into a musical escapade!",
  "Blend your beats with the best! A tuneup of harmony, hype, and happiness!",
  "Epic tuneup alert: bring your vibe, share the stage, create the rage!",
  "Bass, treble, and fantastic tunes! Get ready for a melody bonanza!",
  "Where tunes thrive and vibes are alive—join the jamboree!",
  "From soulful strums to dynamic drums, experience the tuneup extravaganza!",
  "Amp up the amps! It's time for a tuneup that reverberates joy!",
  "Rendezvous at the tuneup: Where every note counts and every song astounds!",
  "Harmonize, improvise, and galvanize! The ultimate tuneup is here!",
  "Rock the block with your stock of shock! Unmissable tuneup time!",
  "Music fiesta alert! Bring your energy, your instrument, and your spirit!",
  "It's a riff-off! May the best tunes win in this electrifying gathering!",
  "Sound the trumpets, bang the drums—it's tuneup time with rhythm and rhymes!",
];

// Create users
const users = [];
for (let i = 0; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const randomImageUrl =
    profileImageUrls[Math.floor(Math.random() * profileImageUrls.length)];
  users.push(
    new User({
      firstName: firstName,
      lastName: lastName,
      email: `demo${i}@demo.com`,
      hashedPassword: bcrypt.hashSync("password", 10),
      // profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
      profileImageUrl: randomImageUrl,
      address: addresses[i],
      instruments: instruments[i],
      genres: [genres[Math.floor(Math.random() * (genres.length - 1))]],
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
        description: descriptions[i + 10],
        status: "true",
        date: faker.date.future(),
        instruments: instruments
          .slice(Math.floor(Math.random() * (instruments.length - 2)))
          .splice(0, 4),
        genre: genres[Math.floor(Math.random() * (genres.length - 1))],
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
        description: descriptions[i],
        status: "true",
        instruments: instruments
          .slice(Math.floor(Math.random() * (instruments.length - 2)))
          .splice(0, 4),
        date: faker.date.future(),
        genre: genres[Math.floor(Math.random() * (genres.length - 1))],
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
