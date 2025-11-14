const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Order = require('../models/order.model');

/**
 * Get all users (admin only)
 */
async function listUsers({ page = 1, limit = 10 } = {}) {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    User.find().skip(skip).limit(limit).sort({ createdAt: -1 }).select('-passwordHash'),
    User.countDocuments(),
  ]);

  return {
    items,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

/**
 * Get user by ID
 */
async function getUserById(id) {
  const user = await User.findById(id).select('-passwordHash');
  return user;
}

/**
 * Create new user (hash password before saving)
 */
async function createUser(data) {
  const { email, password, role } = data;

  if (!password) throw new Error('Password is required');

  const existing = await User.findOne({ email });
  if (existing) throw new Error('User already exists');

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    passwordHash,
    role: role || 'user',
  });

  const sanitized = user.toObject();
  delete sanitized.passwordHash;
  return sanitized;
}

/**
 * Update user (rehash password if provided)
 */
async function updateUser(id, data) {
  const updates = { ...data };

  if (updates.password) {
    updates.passwordHash = await bcrypt.hash(updates.password, 10);
    delete updates.password;
  }

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select('-passwordHash');

  return user;
}

/**
 * Delete user and all their orders
 */
async function deleteUser(id) {
  await Order.deleteMany({ user: id });
  const user = await User.findByIdAndDelete(id);
  return user;
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
