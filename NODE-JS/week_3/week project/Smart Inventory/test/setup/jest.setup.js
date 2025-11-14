const db = require('./test-db');
const mongoose = require('mongoose');

jest.setTimeout(30000); // 30s for MongoMemoryServer operations

beforeAll(async () => {
  await db.connect();
  if (mongoose.connection.readyState !== 1) {
    throw new Error('MongoDB not connected!');
  }
});

afterAll(async () => {
  await db.closeDatabase();
});

afterEach(async () => {
  await db.clearDatabase();
});
