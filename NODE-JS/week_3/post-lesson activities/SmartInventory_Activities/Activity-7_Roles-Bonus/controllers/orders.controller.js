// HNA: orders controller linking order to req.user.id
const Order = require('../models/order.model');

exports.create = async (req, res) => {
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ error: 'Not authenticated' });
  const data = req.body;
  data.user = userId;
  const ord = await Order.create(data);
  res.status(201).json(ord);
};

exports.list = async (req, res) => {
  const q = {};
  if (req.user && req.user.role !== 'admin') {
    q.user = req.user.id; // users only see their orders
  }
  const list = await Order.find(q).populate('items.productId').lean();
  res.json(list);
};
