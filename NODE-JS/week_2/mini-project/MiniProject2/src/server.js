// Knjibo ga3 dkchi li rnkhadmo bih f server
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const carRoutes = require('./routes/cars.routes');
const rentalRoutes = require('./routes/rentals.routes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files
app.use(morgan('combined'));
app.use(logger);

// Routes
app.use('/api/cars', carRoutes);
app.use('/api/rentals', rentalRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Hna knservew l main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Car Rental API running on port ${PORT}`);
});