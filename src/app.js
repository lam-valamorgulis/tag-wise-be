const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(morgan('combined'));

app.use(express.json());

app.use('/v1/api', api);
// Define API route
app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

module.exports = app;
