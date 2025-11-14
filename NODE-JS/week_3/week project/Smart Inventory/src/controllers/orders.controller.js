const orderService = require('../services/orders.service');

async function listOrders(req, res, next) {
  try {
    const result = await orderService.listOrders({
      status: req.query.status,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      user: req.user,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getOrder(req, res, next) {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user);
    res.json(order);
  } catch (err) {
    if (err.message === 'Commande introuvable')
      return res.status(404).json({ message: err.message });
    if (err.message === 'Accès refusé')
      return res.status(403).json({ message: err.message });
    next(err);
  }
}

async function createOrder(req, res, next) {
  try {
    const order = await orderService.createOrder({
      items: req.body.items,
      user: req.user,
    });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listOrders,
  getOrder,
  createOrder,
};
