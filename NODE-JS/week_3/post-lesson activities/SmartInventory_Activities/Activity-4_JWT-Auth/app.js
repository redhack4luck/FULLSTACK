const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

const authRouter = require('./routes/auth.route');
const productsRouter = require('./routes/products.route');

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

app.get('/', (req,res)=> res.json({message: 'Activity 4 - JWT Auth and Authorization'}));

module.exports = app;
