const express = require('express')
const router = express.Router()
const { getProducts } = require('../services/dataService')

// GET /api/products?category=tools&minPrice=20&maxPrice=100&sort=asc
router.get('/', async (req, res, next) => {
  try {
    const filters = {
      category: req.query.category,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      sort: req.query.sort
    }
    const items = await getProducts(filters)
    console.log(`Request: ${req.originalUrl} -> results: ${items.length}`)
    res.json(items)
  } catch (err) { next(err) }
})

module.exports = router
