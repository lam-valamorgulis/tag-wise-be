const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const api = require('./routes/api');

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || '*',
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
