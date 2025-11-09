const fs = require('fs').promises;
const path = require('path');

// Hado paths l files d rentals w cars
const rentalsPath = path.join(__dirname, '../data/rentals.json');
const carsPath = path.join(__dirname, '../data/cars.json');

// Hadi fonction bach n9raw rentals men file
const readRentalsFromFile = async () => {
  try {
    const data = await fs.readFile(rentalsPath, 'utf8'); // 9rina file d rentals
    return JSON.parse(data); // Rjana data b format JSON
  } catch (error) {
    if (error.code === 'ENOENT') return []; // Ila file makaynch, rjana array khawi
    throw error; // Ila kayn error akhor, smehtina l error
  }
};

// Hadi fonction bach n9raw cars men file
const readCarsFromFile = async () => {
  try {
    const data = await fs.readFile(carsPath, 'utf8'); // 9rina file d cars
    return JSON.parse(data); // Rjana data b format JSON
  } catch (error) {
    if (error.code === 'ENOENT') return []; // Ila file makaynch, rjana array khawi
    throw error; // Ila kayn error akhor, smehtina l error
  }
};

// Hadi fonction bach nkteb rentals f file
const writeRentalsToFile = async (rentals) => {
  await fs.writeFile(rentalsPath, JSON.stringify(rentals, null, 2)); // Ktebna rentals f file
};

// Hadi fonction bach nkteb cars f file
const writeCarsToFile = async (cars) => {
  await fs.writeFile(carsPath, JSON.stringify(cars, null, 2)); // Ktebna cars f file
};

// Hadi fonction bach ngeneriw ID jdid l rentals
const generateId = (rentals) => {
  const maxId = rentals.reduce((max, rental) => Math.max(max, parseInt(rental.id) || 0), 0); // L9ina akbar ID kayn
  return (maxId + 1).toString(); // Rjana ID jdid (maxId + 1)
};

// Hadi fonction bach nchofdo wach dates kayoverlapiw
const overlaps = (aFrom, aTo, bFrom, bTo) => {
  return aFrom < bTo && bFrom < aTo; // Nchofdo wach dates kayn overlap
};

// Hadi fonction bach n7sbo ch7al men yom
const calculateDays = (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const timeDiff = toDate.getTime() - fromDate.getTime(); // 7sabna difference b milliseconds
  return Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24))); // Convertina l days w rjana 1 d minimum
};

// Hna darna fonction bach njibdo ga3 l rentals b filters
const getAllRentals = async (filters = {}) => {
  let rentals = await readRentalsFromFile(); // Khdna ga3 l rentals men file
  
  const { status, carId, sort } = filters;
  
  // Nappliquiw filters
  if (status) rentals = rentals.filter(rental => rental.status === status); // Filter b status
  if (carId) rentals = rentals.filter(rental => rental.carId === carId); // Filter b carId

  // Triya (sorting) b date d rental
  if (sort) {
    if (sort === 'asc') {
      rentals.sort((a, b) => new Date(a.date) - new Date(b.date)); // Triya sghira l kbira
    } else if (sort === 'desc') {
      rentals.sort((a, b) => new Date(b.date) - new Date(a.date)); // Triya kbira l sghira
    }
  }
  
  return rentals; // Rjana rentals li filtra
};

// Hadi bach njibo rental wa7d b ID
const getRentalById = async (id) => {
  const rentals = await readRentalsFromFile();
  return rentals.find(rental => rental.id === id); // L9ina rental b had ID
};

// Hna bach ncreaw rental jdida
const createRental = async (rentalData) => {
  const rentals = await readRentalsFromFile();
  const cars = await readCarsFromFile();
  const now = new Date().toISOString(); // Khdna timestamp d daba
  
  // Nchofdo wach car kayna
  const car = cars.find(c => c.id === rentalData.carId);
  if (!car) {
    throw new Error('Car not found'); // Ila car makaynch, smehtina error
  }
  
  // Nchofdo wach car available
  if (!car.available) {
    throw new Error('Car is not available for rental'); // Ila car machi available, smehtina error
  }
  
  // Nchofdo wach kayn overlapping rentals
  const overlappingRental = rentals.find(rental => 
    rental.carId === rentalData.carId && 
    rental.status === 'active' &&
    overlaps(
      new Date(rental.from),
      new Date(rental.to),
      new Date(rentalData.from),
      new Date(rentalData.to)
    )
  );
  
  if (overlappingRental) {
    throw new Error('Car is already rented during this period'); // Ila kayn overlap, smehtina error
  }
  
  // 7sabna total price
  const days = calculateDays(rentalData.from, rentalData.to); // 7sabna ch7al men yom
  const total = days * car.pricePerDay; // Darna days * price per day
  
  // Creana rental jdida
  const newRental = {
    id: generateId(rentals), // Generina ID jdid
    carId: rentalData.carId,
    customer: rentalData.customer,
    from: rentalData.from,
    to: rentalData.to,
    days: days, // Number d days
    dailyRate: car.pricePerDay, // Price per day
    total: parseFloat(total.toFixed(2)), // Total price
    status: 'active', // Status active
    createdAt: now,  // Date d création
    updatedAt: now   // Date d modification
  };
  
  // Updateyna car w sebtna available false
  car.available = false;
  car.updatedAt = now;
  
  rentals.push(newRental); // Zadna rental jdida f array
  await writeRentalsToFile(rentals); // Ktebna rentals jdida f file
  await writeCarsToFile(cars); // Ktebna cars li tupdate f file
  
  return newRental; // Rjana rental jdida
};

// Hna bach n3tiw rental (return car)
const returnRental = async (id) => {
  const rentals = await readRentalsFromFile();
  const cars = await readCarsFromFile();
  const now = new Date().toISOString(); // Khdna timestamp d daba
  
  const rentalIndex = rentals.findIndex(rental => rental.id === id); // L9ina index d rental
  if (rentalIndex === -1) return null; // Ila makaynch rental, rjana null
  
  const rental = rentals[rentalIndex];
  // Nchofdo wach rental active
  if (rental.status !== 'active') {
    throw new Error('Rental is not active'); // Ila machi active, smehtina error
  }
  
  // Updateyna car w sebtna available true
  const car = cars.find(c => c.id === rental.carId);
  if (car) {
    car.available = true; // Sebtna car available
    car.updatedAt = now; // Updateyna date
  }
  
  // Updateyna rental
  const updatedRental = {
    ...rental,
    status: 'returned', // Sebtna status returned
    updatedAt: now
  };
  
  rentals[rentalIndex] = updatedRental; // Updateyna rental f array
  
  await writeRentalsToFile(rentals); // Ktebna rentals jdida f file
  await writeCarsToFile(cars); // Ktebna cars li tupdate f file
  
  return updatedRental; // Rjana rental li t3tet
};

// Hna bach nmsa7o rental (cancel)
const cancelRental = async (id) => {
  const rentals = await readRentalsFromFile();
  const cars = await readCarsFromFile();
  const now = new Date().toISOString(); // Khdna timestamp d daba
  
  const rentalIndex = rentals.findIndex(rental => rental.id === id); // L9ina index d rental
  if (rentalIndex === -1) return null; // Ila makaynch rental, rjana null
  
  const rental = rentals[rentalIndex];
  // Nchofdo wach rental active
  if (rental.status !== 'active') {
    throw new Error('Only active rentals can be cancelled'); // Ghi active rentals ynjm ytmsa7o
  }
  
  // Updateyna car w sebtna available true
  const car = cars.find(c => c.id === rental.carId);
  if (car) {
    car.available = true; // Sebtna car available
    car.updatedAt = now; // Updateyna date
  }
  
  // Updateyna rental
  const updatedRental = {
    ...rental,
    status: 'cancelled', // Sebtna status cancelled
    updatedAt: now
  };
  
  rentals[rentalIndex] = updatedRental; // Updateyna rental f array
  
  await writeRentalsToFile(rentals); // Ktebna rentals jdida f file
  await writeCarsToFile(cars); // Ktebna cars li tupdate f file
  
  return updatedRental; // Rjana rental li tmsa7et
};

// Khrjna l functions l kol bach nst3amlohom f routes
module.exports = {
  getAllRentals,
  getRentalById,
  createRental,
  returnRental,
  cancelRental
};