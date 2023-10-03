const DEFAULT_PROFILE_IMAGE_URL = 'https://tuneup-mern-seeds.s3.amazonaws.com/public/blank-profile-picture-973460_1280.png';

// Connect to database
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connected to MongoDB successfully');
//     initializeImages();
//   })
//   .catch(err => {
//     console.error(err.stack);
//     process.exit(1);
//   });

// // Initialize image fields in db
// const initializeImages = async () => {
//   console.log("Initializing profile avatars...");
//   await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });

//   console.log("Done!");
//   mongoose.disconnect();
// }

module.exports = DEFAULT_PROFILE_IMAGE_URL;