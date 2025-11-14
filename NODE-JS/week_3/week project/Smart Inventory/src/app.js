const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');

const { authLimiter, apiLimiter } = require('./middlewares/rateLimit');

const authRouter = require('./routes/auth.routes')
const productsRouter = require('./routes/products.routes');
const ordersRouter = require('./routes/orders.routes');
const userRouter=require('./routes/users.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares globaux
app.use(helmet());
app.use(cors());
app.use(express.json());
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Catch-all to serve index.html for any other requests (SPA behavior)


// Logger
if (config.env === 'development') {
  app.use(morgan('dev')); 
} else {
  app.use(morgan('combined')); 
}
// Routes
app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', userRouter);
// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Gestion des erreurs
app.use(errorHandler);

module.exports = app;