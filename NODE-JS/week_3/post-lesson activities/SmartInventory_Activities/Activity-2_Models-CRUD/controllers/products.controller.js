// HNA: products controller
const service = require('../services/products.service');

exports.create = async (req, res) => {
  const p = await service.create(req.body);
  res.status(201).json(p);
};

exports.list = async (req, res) => {
  const list = await service.list();
  res.json(list);
};
