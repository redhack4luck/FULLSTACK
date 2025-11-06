const fs = require('fs').promises
const path = require('path')
const dataPath = path.join(__dirname, '..', 'data', 'products.json')

// knkhdmo service bash nqraw products w ndirou filtering
async function getProducts(filters = {}) {
  const raw = await fs.readFile(dataPath, 'utf-8')
  let items = JSON.parse(raw)

  const { category, minPrice, maxPrice, sort } = filters

  if (category) items = items.filter(i => i.category === category)
  if (minPrice) items = items.filter(i => i.price >= Number(minPrice))
  if (maxPrice) items = items.filter(i => i.price <= Number(maxPrice))

  if (sort === 'asc') items.sort((a,b) => a.price - b.price)
  else if (sort === 'desc') items.sort((a,b) => b.price - a.price)

  return items
}

module.exports = { getProducts }
