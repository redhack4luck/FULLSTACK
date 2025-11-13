const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// CORS origin from env
const origin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin }));

const authRouter = require('./routes/auth.route');
const productsRouter = require('./routes/products.route');
const ordersRouter = require('./routes/orders.route');

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

app.get('/', (req,res)=> res.json({message: 'Activity 6 - Security middlewares (helmet, cors, rate limit)'}));

module.exports = app;
