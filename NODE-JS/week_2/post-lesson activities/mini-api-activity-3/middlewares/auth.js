// middleware li kaychecki token simple f headers
module.exports = function auth(req, res, next) {
  const token = req.headers.authorization
  if (token === '1234') {
    // mzzian
    next()
  } else {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' })
  }
}
