const userService = require('../services/users.service');

/**
 * List all users (admin only)
 */
async function listUsers(req, res, next) {
  try {
    // only admin can list all users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const result = await userService.listUsers({
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

/**
 * Get a single user
 */
async function getUser(req, res, next) {
  try {
    // user can only get self, admin can get any user
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    res.json(user);
  } catch (err) {
    next(err);
  }
}

/**
 * Create user (admin only)
 */
async function createUser(req, res, next) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err.message.includes('Email déjà utilisé')) {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}

/**
 * Update user (self or admin)
 */
async function updateUser(req, res, next) {
  try {
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    res.json(user);
  } catch (err) {
    next(err);
  }
}

/**
 * Delete user and cascade delete orders (admin or self)
 */
async function deleteUser(req, res, next) {
  try {
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const user = await userService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    res.json({ message: 'Utilisateur et commandes associées supprimés' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
