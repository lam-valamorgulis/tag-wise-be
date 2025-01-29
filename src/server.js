const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config({ path: './src/.env' });

const api = require('./routes/api');

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://tag-wise-be.vercel.app',
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.use(morgan('combined'));
app.use(express.json());

// Define API routes
app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.use('/v1/api', api);

app.get('*', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

const PORT = process.env.PORT || 8000;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });
