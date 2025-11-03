require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

app.use(logger);
app.use(express.json());

// ROUTES
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express Server Running on port ${port} :`);
})