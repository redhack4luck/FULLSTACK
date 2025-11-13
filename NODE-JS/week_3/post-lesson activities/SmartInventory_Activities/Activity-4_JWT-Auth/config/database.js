// HNA KNDEMAREW DATABASE CONNECTION - mongoose connect
const mongoose = require('mongoose');

module.exports = function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_inventory_db';
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
