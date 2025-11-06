// class AppError li ghadi nst3mloh bash nthrowiw errors structured
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.timestamp = new Date().toISOString()
  }
}

module.exports = AppError
