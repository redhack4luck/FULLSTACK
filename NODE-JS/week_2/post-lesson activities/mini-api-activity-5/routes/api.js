const express = require('express')
const router = express.Router()
const resources = require('./resources')
const privateRoute = require('./private')
const products = require('./products')

// knkdiro route li kat3ti info 3la project
router.get('/info', (req, res) => {
  res.json({
    name: 'mini-api',
    version: '1.0.0',
    date: new Date().toISOString()
  })
})

// mount routes
router.use('/resources', resources)
router.use('/private', privateRoute)
router.use('/products', products)

module.exports = router
