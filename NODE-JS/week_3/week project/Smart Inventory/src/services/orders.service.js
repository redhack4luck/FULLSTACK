const Order = require('../models/order.model');
const Product = require('../models/product.model');

/**
 * List orders (admin: all, user: own)
 */
async function listOrders({ status, page = 1, limit = 10, user } = {}) {
  const filter = {};

  if (status) filter.status = status;
  if (user.role !== 'admin') filter.user = user.id;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Order.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('items.product')
      .populate('user', '-passwordHash'),
    Order.countDocuments(filter),
  ]);

  return {
    items,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

/**
 * Get single order by ID (check ownership)
 */
async function getOrderById(id, user) {
  const order = await Order.findById(id)
    .populate('items.product')
    .populate('user', '-passwordHash');

  if (!order) throw new Error('Commande introuvable');

  if (user.role !== 'admin' && order.user._id.toString() !== user.id) {
    throw new Error('Accès refusé');
  }

  return order;
}

/**
 * Create new order (and update product stock)
 */
async function createOrder({ items, user }) {
  // Get product data
  const productIds = items.map((i) => i.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  // Build order items
  const orderItems = items.map((i) => {
    const product = products.find((p) => p._id.toString() === i.productId);
    if (!product) throw new Error(`Produit introuvable: ${i.productId}`);
    if (product.stock < i.quantity)
      throw new Error(`Stock insuffisant pour ${product.name}`);

    return {
      product: product._id,
      quantity: i.quantity,
      unitPrice: product.price,
    };
  });

  // Compute total
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  // Create order
  const order = await Order.create({
    items: orderItems,
    totalAmount,
    status: 'pending',
    user: user.id,
  });

  // Update product stock
  for (const item of orderItems) {
    const product = products.find((p) => p._id.toString() === item.product.toString());
    product.stock -= item.quantity;
    product.inStock = product.stock > 0;
    await product.save();
  }

  return order;
}

module.exports = {
  listOrders,
  getOrderById,
  createOrder,
};
