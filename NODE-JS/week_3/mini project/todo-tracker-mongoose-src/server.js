require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middlewares/errorHandler');
const authRoutes = require('./src/routes/auth');
const todoRoutes = require('./src/routes/todos');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(rateLimit({ windowMs: 1*60*1000, max: 100 }));

connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => console.log('Server running'));
