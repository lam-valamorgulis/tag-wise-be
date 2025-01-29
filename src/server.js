const http = require('http');
const serverless = require('serverless-http');

require('dotenv').config({ path: './src/.env' });

const app = require('./app');
const { mongoConnect } = require('./service/mongo');

const PORT = process.env.PORT || 8000;

// const server = http.createServer(app);

// async function startServer() {
//   try {
//     await mongoConnect();
//     server.listen(PORT, () => {
//       console.log(`Listening on port ${PORT}...`);
//     });
//   } catch (err) {
//     console.error('Error starting server:', err);
//     process.exit(1);
//   }
// }

// startServer();
// Initialize MongoDB connection
async function initialize() {
  try {
    await mongoConnect();
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

initialize();

// Export the Vercel serverless handler
module.exports.handler = serverless(app);

// Local server for development
if (process.env.NODE_ENV !== 'production') {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Local server running on port ${PORT}...`);
  });
}
