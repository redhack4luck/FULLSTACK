// middleware li kaymna3 requests bin 22:00 w 06:00
module.exports = function timeLimiter(req, res, next) {
  const h = new Date().getHours()
  if (h >= 22 || h < 6) {
    return res.status(403).json({ status: 'fail', message: 'Service not available at night' })
  }
  next()
}
