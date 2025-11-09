const carService = require('../services/cars.service');

// Darna function bach njibdo ga3 l cars
const getAllCars = async (req, res, next) => {
  try {
    const filters = req.query; // Khdna l filters men query parameters
    const cars = await carService.getAllCars(filters);
    res.json(cars); // Rjana l cars f response
  } catch (error) {
    next(error); // Ila kayn error, n9admo l next middleware
  }
};

// Hadi bach njibo car wa7d b ID
const getCarById = async (req, res, next) => {
  try {
    const car = await carService.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' }); // Ila makaynch car, rjana error 404
    }
    res.json(car); // Ila kayna, rjanna car
  } catch (error) {
    next(error);
  }
};

// Hna darna fonction bach ncreaw car jdida
const createCar = async (req, res, next) => {
  try {
    const { brand, model, category, plate, pricePerDay } = req.body;
    
    // Validation - bach nchofdo wach ga3 l fields mliwlin
    if (!brand || !model || !category || !plate || !pricePerDay) {
      return res.status(400).json({ error: 'All fields are required' }); // Ila b9a 7aja n9essa, rjana error
    }
    
    // Nchofdo wach category sahla
    if (!['eco', 'sedan', 'suv', 'van'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' }); // Category machi sahla
    }
    
    // Nchofdo wach price kbir men 0
    if (pricePerDay <= 0) {
      return res.status(400).json({ error: 'Price per day must be positive' }); // Price khassha tkoun positive
    }
    
    const newCar = await carService.createCar(req.body); // Creana car jdida
    res.status(201).json(newCar); // Rjana car jdida f response b status 201
  } catch (error) {
    next(error);
  }
};

// Hna bach nmodifiwi car
const updateCar = async (req, res, next) => {
  try {
    const updatedCar = await carService.updateCar(req.params.id, req.body);
    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' }); // Ila makaynch car b had l ID
    }
    res.json(updatedCar); // Rjana car li tupdate
  } catch (error) {
    next(error);
  }
};

// Hna bach nmsa7o car
const deleteCar = async (req, res, next) => {
  try {
    const deleted = await carService.deleteCar(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Car not found' }); // Ila makaynch car b had l ID
    }
    res.status(204).send(); // Rjana response khawya b status 204 (no content)
  } catch (error) {
    next(error);
  }
};

// Hna khrjna l functions l khra bach nst3amlohom f routes
module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
};