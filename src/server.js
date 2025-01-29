const http = require('http');

require('dotenv').config({ path: './src/.env' });

const app = require('./app');
const { mongoConnect } = require('./service/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  try {
    await mongoConnect();
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

// Only start server when run directly (not when imported by Vercel)
if (require.main === module) {
  startServer().catch((err) => {
    console.error('Server startup error:', err);
    process.exit(1);
  });
}

module.exports = app; // Export for Vercel
