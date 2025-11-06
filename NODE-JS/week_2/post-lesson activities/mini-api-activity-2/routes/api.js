const express = require('express')
const router = express.Router()
const resources = require('./resources')

// knkdiro route li kat3ti info 3la project
router.get('/info', (req, res) => {
  res.json({
    name: 'mini-api',
    version: '1.0.0',
    date: new Date().toISOString()
  })
})

// mount resources
router.use('/resources', resources)

module.exports = router
