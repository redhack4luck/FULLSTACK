const productService = require('../services/products.service');

async function listProducts(req, res, next) {
  try {
    const result = await productService.listProducts({
      category: req.query.category,
      inStock: req.query.inStock,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Produit introuvable' });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product)
      return res.status(404).json({ message: 'Produit introuvable' });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Produit introuvable' });
    res.json({ message: 'Produit et commandes associées supprimés' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
