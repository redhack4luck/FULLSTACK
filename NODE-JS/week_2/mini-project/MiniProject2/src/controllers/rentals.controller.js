const rentalService = require('../services/rentals.service');

// function bach njibdo ga3 l rentals
const getAllRentals = async (req, res, next) => {
  try {
    const filters = req.query; // Khdna l filters men query parameters
    const rentals = await rentalService.getAllRentals(filters);
    res.json(rentals); // Rjana l rentals f response
  } catch (error) {
    next(error); // Ila kayn error, n9admo l next middleware
  }
};

// Hadi bach njibo rental wa7d b ID
const getRentalById = async (req, res, next) => {
  try {
    const rental = await rentalService.getRentalById(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: 'Rental not found' }); // Ila makaynch rental, rjana error 404
    }
    res.json(rental); // Ila kayna, rjanna rental
  } catch (error) {
    next(error);
  }
};

// Hna darna fonction bach ncreaw rental jdida
const createRental = async (req, res, next) => {
  try {
    const { carId, customer, from, to } = req.body;
    
    // Validation - bach nchofdo wach ga3 l fields mliwlin
    if (!carId || !customer || !from || !to) {
      return res.status(400).json({ error: 'All fields are required' }); // Ila b9a 7aja n9essa, rjana error
    }
    
    // Nchofdo wach customer 3ndo name w email
    if (!customer.name || !customer.email) {
      return res.status(400).json({ error: 'Customer name and email are required' }); // Name w email khasshom ykonu kaynin
    }
    
    // Nchofdo wach date d fin ba3d date d début
    if (new Date(from) >= new Date(to)) {
      return res.status(400).json({ error: 'End date must be after start date' }); // Date d fin khassha tkoun ba3d date d début
    }
    
    const newRental = await rentalService.createRental(req.body); // Creana rental jdida
    res.status(201).json(newRental); // Rjana rental jdida f response b status 201
  } catch (error) {
    // Ila car makaynatch aw deja mst3mla
    if (error.message.includes('not available') || error.message.includes('already rented')) {
      return res.status(409).json({ error: error.message }); // Rjana error 409 (conflict)
    }
    next(error);
  }
};

// Hna bach n3tiw rental (return)
const returnRental = async (req, res, next) => {
  try {
    const updatedRental = await rentalService.returnRental(req.params.id);
    if (!updatedRental) {
      return res.status(404).json({ error: 'Rental not found' }); // Ila makaynch rental b had l ID
    }
    res.json(updatedRental); // Rjana rental li t3tet (returned)
  } catch (error) {
    next(error);
  }
};

// Hna bach nmsa7o rental (cancel)
const cancelRental = async (req, res, next) => {
  try {
    const cancelledRental = await rentalService.cancelRental(req.params.id);
    if (!cancelledRental) {
      return res.status(404).json({ error: 'Rental not found' }); // Ila makaynch rental b had l ID
    }
    res.json(cancelledRental); // Rjana rental li tmsa7et (cancelled)
  } catch (error) {
    next(error);
  }
};

// Hna khrjna l functions l khra bach nst3amlohom f routes
module.exports = {
  getAllRentals,
  getRentalById,
  createRental,
  returnRental,
  cancelRental
};