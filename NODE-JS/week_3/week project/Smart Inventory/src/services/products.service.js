const Product = require('../models/product.model');
const Order = require('../models/order.model');

/**
 * List products with filters & pagination
 */
async function listProducts({ category, inStock, page = 1, limit = 10 } = {}) {
  const filter = {};

  if (category) filter.category = category;
  if (inStock !== undefined) filter.inStock = inStock;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Product.countDocuments(filter),
  ]);

  return {
    items,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

/**
 * Get single product by ID
 */
async function getProductById(id) {
  return await Product.findById(id);
}

/**
 * Create product
 */
async function createProduct(data) {
  const product = await Product.create({
    ...data,
    inStock: data.stock > 0, // auto set stock state
  });
  return product;
}

/**
 * Update product
 */
async function updateProduct(id, data) {
  if (data.stock !== undefined) {
    data.inStock = data.stock > 0;
  }

  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return product;
}

/**
 * Delete product and cascade delete related orders
 */
async function deleteProduct(id) {
  const product = await Product.findByIdAndDelete(id);
  if (!product) return null;

  // Delete all orders containing this product
  await Order.deleteMany({ 'items.product': id });

  return product;
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
