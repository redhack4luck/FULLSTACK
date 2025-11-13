// HNA: auth service - hashing with bcryptjs
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.register = async ({ name, email, password, role }) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, passwordHash: hash, role });
  return { id: user._id, email: user.email, role: user.role };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
};
