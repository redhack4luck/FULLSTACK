const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

const authRouter = require('./routes/auth.route');
app.use('/api/auth', authRouter);

app.get('/', (req,res)=> res.json({message: 'Activity 3 - Users and Hashing'}));

module.exports = app;
