// middleware li kayt9bbal l'erreurs w kayrdd JSON
function errorHandler(err, req, res, next) {
  console.error(err)
  const status = err.statusCode || 500
  res.status(status).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  })
}

module.exports = { errorHandler }
