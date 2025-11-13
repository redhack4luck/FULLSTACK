// HNA KNDEMAREW APP - express app minimal
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet()); // HNA: security headers
app.use(express.json());
app.use(morgan('dev'));

// basic route
app.get('/', (req, res) => {
  res.json({message: 'Smart Inventory API - Activity'});
});

module.exports = app;
