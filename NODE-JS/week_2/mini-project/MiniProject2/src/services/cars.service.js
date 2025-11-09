const fs = require('fs').promises;
const path = require('path');

// Darna path l file d cars
const dataPath = path.join(__dirname, '../data/cars.json');

// Hadi fonction bach n9raw data men file
const readCarsFromFile = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf8'); // 9rina file b utf8
    return JSON.parse(data); // Rjana data b format JSON
  } catch (error) {
    if (error.code === 'ENOENT') return []; // Ila file makaynch, rjana array khawi
    throw error; // Ila kayn error akhor, smehtina l error
  }
};

// Hadi fonction bach nkteb data f file
const writeCarsToFile = async (cars) => {
  await fs.writeFile(dataPath, JSON.stringify(cars, null, 2)); // Ktebna data f file b format mzyan
};

// Hadi fonction bach ngeneriw ID jdid
const generateId = (cars) => {
  const maxId = cars.reduce((max, car) => Math.max(max, parseInt(car.id) || 0), 0); // L9ina akbar ID kayn
  return (maxId + 1).toString(); // Rjana ID jdid (maxId + 1)
};

// Hna darna fonction bach njibdo ga3 l cars b filters
const getAllCars = async (filters = {}) => {
  let cars = await readCarsFromFile(); // Khdna ga3 l cars men file
  
  const { brand, category, available, minPrice, maxPrice, q } = filters;
  
  // Nappliquiw filters
  if (brand) cars = cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase()); // Filter b brand
  if (category) cars = cars.filter(car => car.category.toLowerCase() === category.toLowerCase()); // Filter b category
  if (available !== undefined) {
    // Converti string 'true'/'false' l boolean
    const availableBool = available === 'true';
    cars = cars.filter(car => car.available === availableBool); // Filter b available
  }
  if (minPrice) cars = cars.filter(car => car.pricePerDay >= parseFloat(minPrice)); // Filter b minimum price
  if (maxPrice) cars = cars.filter(car => car.pricePerDay <= parseFloat(maxPrice)); // Filter b maximum price
  if (q) {
    const searchTerm = q.toLowerCase();
    cars = cars.filter(car => 
      car.plate.toLowerCase().includes(searchTerm) || 
      car.model.toLowerCase().includes(searchTerm) // Search b plate wla model
    );
  }
  
  return cars; // Rjana cars li filtra
};

// Hadi bach njibo car wa7d b ID
const getCarById = async (id) => {
  const cars = await readCarsFromFile();
  return cars.find(car => car.id === id); // L9ina car b had ID
};

// Hna bach ncreaw car jdida
const createCar = async (carData) => {
  const cars = await readCarsFromFile();
  const now = new Date().toISOString(); // Khdna timestamp d daba
  
  // Nchofdo wach plate deja kayna
  const existingCar = cars.find(car => car.plate === carData.plate);
  if (existingCar) {
    throw new Error('Car with this plate already exists'); // Ila plate deja kayna, smehtina error
  }
  
  // Creana car jdida
  const newCar = {
    id: generateId(cars), // Generina ID jdid
    brand: carData.brand,
    model: carData.model,
    category: carData.category,
    plate: carData.plate,
    pricePerDay: parseFloat(carData.pricePerDay), // Convertina price l number
    available: true, // Dima car jdida available
    createdAt: now,  // Date d création
    updatedAt: now   // Date d modification
  };
  
  cars.push(newCar); // Zadna car jdida f array
  await writeCarsToFile(cars); // Ktebna array jdida f file
  return newCar; // Rjana car jdida
};

// Hna bach nmodifiwi car
const updateCar = async (id, updateData) => {
  const cars = await readCarsFromFile();
  const carIndex = cars.findIndex(car => car.id === id); // L9ina index d car
  
  if (carIndex === -1) return null; // Ila makaynch car, rjana null
  
  // Darna update l car
  const updatedCar = { 
    ...cars[carIndex], // Khdna data l9dima
    ...updateData,     // Zadna data jdida
    updatedAt: new Date().toISOString() // Updateyna date d modification
  };
  
  cars[carIndex] = updatedCar; // Updateyna car f array
  await writeCarsToFile(cars); // Ktebna array jdida f file
  return updatedCar; // Rjana car li tupdate
};

// Hna bach nmsa7o car
const deleteCar = async (id) => {
  const cars = await readCarsFromFile();
  const carIndex = cars.findIndex(car => car.id === id); // L9ina index d car
  
  if (carIndex === -1) return false; // Ila makaynch car, rjana false
  
  cars.splice(carIndex, 1); // Msa7na car men array
  await writeCarsToFile(cars); // Ktebna array jdida f file
  return true; // Rjana true bach n3almow bli tmsa7et
};

// Khrjna l functions l kol bach nst3amlohom f routes
module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
};