const express = require('express');
const r = express.Router();
const c = require('../controllers/authController');

r.post('/register',c.register);
r.post('/login',c.login);

module.exports=r;