// HNA: simple products service using mongoose
const Product = require('../models/product.model');

exports.create = (data) => Product.create(data);
exports.list = () => Product.find().lean();
exports.getById = (id) => Product.findById(id);
exports.deleteById = (id) => Product.findByIdAndDelete(id);
