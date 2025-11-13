const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
const origin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin }));

const authRouter = require('./routes/auth.route');
const productsRouter = require('./routes/products.route');
const ordersRouter = require('./routes/orders.route');

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

// dashboard route reserved for admin and manager
const auth = require('./middleware/auth.middleware');
const authorize = require('./middleware/authorize.middleware');

app.get('/api/dashboard', auth, authorize('admin','manager'), (req,res) => {
  res.json({ message: 'Welcome to dashboard for admin or manager' });
});

app.get('/', (req,res)=> res.json({message: 'Activity 7 - Roles and dashboard'}));

module.exports = app;
