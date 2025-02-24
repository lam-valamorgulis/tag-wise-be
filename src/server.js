const http = require('http');

require('dotenv').config({ path: './src/.env' });

console.log('ADOBE_BASE_URL:', process.env.ADOBE_BASE_URL);

const app = require('./app');
const { mongoConnect } = require('./service/mongo');

const PORT = process.env.PORT || 8000; // Set your desired port here

const server = http.createServer(app);

async function startServer() {
  try {
    await mongoConnect();
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();
