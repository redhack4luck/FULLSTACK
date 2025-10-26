const products = require('../../data/products.json');

let cachedProducts = null;


function loadProducts() {
  if (!cachedProducts) cachedProducts = products;
  return cachedProducts;
}

function getAll(query = {}) {
  const all = loadProducts();


  let filtered = all.filter(p => {
    if (query.q && !p.name.toLowerCase().includes(query.q.toLowerCase())) return false;
    if (query.category && p.category.toLowerCase() !== query.category.toLowerCase()) return false;
    if (query.minPrice && p.prix < parseFloat(query.minPrice)) return false;
    if (query.maxPrice && p.prix > parseFloat(query.maxPrice)) return false;
    if (query.inStock && p.inStock !== (query.inStock.toLowerCase() === 'true')) return false;
    return true;
  });

  
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const total = filtered.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return { total, page, pages, data };
}


function getById(id) {
  return loadProducts().find(p => p.id === parseInt(id));
}

function getBySku(sku) {
  return loadProducts().find(p => p.sku === sku);
}

function getByCategory(category) {
  return loadProducts().filter(p => p.category.toLowerCase() === category.toLowerCase());
}


function getRawData() {
  return loadProducts();
}

module.exports = {
  getAll,
  getById,
  getBySku,
  getByCategory,
  getRawData
};