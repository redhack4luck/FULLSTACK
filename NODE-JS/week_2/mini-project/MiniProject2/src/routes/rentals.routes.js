const express = require('express');
const rentalsController = require('../controllers/rentals.controller');

const router = express.Router();

router.get('/', rentalsController.getAllRentals);
router.get('/:id', rentalsController.getRentalById);
router.post('/', rentalsController.createRental);
router.put('/:id/return', rentalsController.returnRental);
router.delete('/:id', rentalsController.cancelRental);

module.exports = router;