const express = require('express');
const ctrl = require('../controllers/resourceController');
const validateResource = require('../middlewares/validateData');

const router = express.Router();


router.get('/', ctrl.getAllResources);
router.get('/:id', ctrl.getResourceById);
router.post('/', validateResource, ctrl.getResourceById)

module.exports = router;

