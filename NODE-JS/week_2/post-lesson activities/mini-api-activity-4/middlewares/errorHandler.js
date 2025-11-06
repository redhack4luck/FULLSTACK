// updated error handler li kayst3mel AppError
const AppError = require('../utils/AppError')

function errorHandler(err, req, res, next) {
  console.error(err)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      timestamp: err.timestamp
    })
  }
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    timestamp: new Date().toISOString()
  })
}

module.exports = { errorHandler }
