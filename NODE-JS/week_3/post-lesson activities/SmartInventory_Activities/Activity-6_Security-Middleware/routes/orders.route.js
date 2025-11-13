const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/orders.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, ctrl.create);
router.get('/', auth, ctrl.list);

module.exports = router;
