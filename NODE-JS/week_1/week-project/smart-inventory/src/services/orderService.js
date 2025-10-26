const fs = require('fs');
const path = require('path');

let cachedOrders = null;

try {
  const dataPath = path.join(__dirname, '..', '..', 'data', 'orders.json');
  const data = fs.readFileSync(dataPath, 'utf-8');
  cachedOrders = JSON.parse(data);
} catch (e) {
  console.error("Error loading orders data:", e.message);
  throw new Error("500: Failed to load order data from file.");
}


function getAll(query = {}) {
  let orders = cachedOrders;

  orders = orders.filter(o => {
    if (query.orderNumber && !o.orderNumber.toLowerCase().includes(query.orderNumber.toLowerCase())) return false;
    if (query.status && o.status.toLowerCase() !== query.status.toLowerCase()) return false;
    if (query.fromDate && new Date(o.dateCreation) < new Date(query.fromDate)) return false;
    if (query.toDate && new Date(o.dateCreation) > new Date(query.toDate)) return false;
    return true;
  });

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const total = orders.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;

  return {
    total,
    page,
    pages,
    data: orders.slice(start, start + limit)
  };
}


function getById(id) {
  return cachedOrders.find(o => o.id === parseInt(id, 10));
}


function getByNumber(orderNumber) {
  return cachedOrders.find(o => o.orderNumber === orderNumber);
}

module.exports = {
  getAll,
  getById,
  getByNumber
};