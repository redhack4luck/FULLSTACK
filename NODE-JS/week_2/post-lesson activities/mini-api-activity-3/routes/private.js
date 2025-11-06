const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const timeLimiter = require('../middlewares/timeLimiter')

// had routes khasshom auth w timeLimiter
router.use(auth, timeLimiter)

router.get('/', (req, res) => {
  res.json({ secret: 'this is private data' })
})

module.exports = router
