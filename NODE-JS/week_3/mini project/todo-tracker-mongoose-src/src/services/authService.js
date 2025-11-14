const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async(email,password)=>{
  const ex = await User.findOne({email});
  if(ex) throw new Error('Email already used');
  const hashed = await bcrypt.hash(password,10);
  return User.create({email,password:hashed});
};

exports.loginUser = async(email,password)=>{
  const u = await User.findOne({email});
  if(!u) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password,u.password);
  if(!ok) throw new Error('Invalid credentials');
  const payload = {id:u._id,role:u.role};
  return jwt.sign(payload,process.env.JWT_SECRET||'secret',{expiresIn:process.env.JWT_EXPIRES_IN||'1d'});
};
