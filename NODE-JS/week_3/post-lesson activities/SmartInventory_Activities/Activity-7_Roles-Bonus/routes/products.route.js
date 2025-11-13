const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/products.controller');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');

// anyone can list
router.get('/', ctrl.list);
// only admin can create
router.post('/', auth, authorize('admin'), ctrl.create);

module.exports = router;
