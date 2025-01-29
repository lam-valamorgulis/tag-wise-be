const mongoose = require('mongoose');

// require('dotenv').config();

// // Update below to match your own MongoDB connection string.
// const { MONGO_URL } = process.env;

// mongoose.connection.once('open', () => {
//   console.log('MongoDB connection ready!');
// });

// mongoose.connection.on('error', (err) => {
//   console.error(err);
// });

// async function mongoConnect() {
//   await mongoose.connect(MONGO_URL);
// }

// async function mongoDisconnect() {
//   await mongoose.disconnect();
// }

// module.exports = {
//   mongoConnect,
//   mongoDisconnect,
// };

let cachedDb = null;

async function mongoConnect() {
  if (cachedDb) return cachedDb;

  const client = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedDb = client.connection;
  return cachedDb;
}

module.exports = { mongoConnect };
