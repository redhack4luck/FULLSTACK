const express = require('express');
const router = express.Router();
const { getInfo } = require('../controllers/infoController');

router.get('/info', getInfo);

module.exports = router;

