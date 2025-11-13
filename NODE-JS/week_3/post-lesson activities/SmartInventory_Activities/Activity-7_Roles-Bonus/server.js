// HNA KNDEMAREW SERVER DIALNA - starting server after DB connection
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch(err => {
    console.error('Failed to connect DB:', err);
    process.exit(1);
  });
