const express = require('express')
const router = express.Router()

// knkdiro route li kat3ti info 3la project
router.get('/info', (req, res) => {
  res.json({
    name: 'mini-api',
    version: '1.0.0',
    date: new Date().toISOString()
  })
})

module.exports = router
