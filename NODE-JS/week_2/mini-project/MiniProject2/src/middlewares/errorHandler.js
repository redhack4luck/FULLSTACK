// Hada middleware d gestion d errors
function errorHandler(err, req, res, next) {
  // Zadna hna, n9ew error f console 
  console.error(err.stack);
  
  // Khdna status code d error, ila makaynch nst3mlo 500
  const statusCode = err.statusCode || 500;
  // Khdna message d error, ila makaynch nst3mlo 'Internal Server Error'
  const message = err.message || 'Internal Server Error';
  
  // Rjana response b error l user
  res.status(statusCode).json({
    status: 'error',
    message: message,
    code: statusCode,
    timestamp: new Date().toISOString()
  });
}

// Khrjna l middleware bach nst3amloh f server
module.exports = errorHandler;