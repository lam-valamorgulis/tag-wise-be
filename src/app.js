const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://tag-wise-fe.vercel.app',
  'http://144.24.91.195:4000',
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

// Define API route
app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.use('/v1/api', api);

module.exports = app;
