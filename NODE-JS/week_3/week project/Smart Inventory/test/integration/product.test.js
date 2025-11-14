const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/user.model');
const Product = require('../../src/models/product.model');

describe('Product creation', () => {
  let adminToken, userToken;
  let adminId, userId;

  beforeAll(async () => {
    // Nettoyer les utilisateurs et produits de test
    await User.deleteMany({ email: /test/i });
    await Product.deleteMany({});

    // Créer un admin
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'admin@test.com', password: 'admin123', role: 'admin' });

    // Créer un utilisateur normal
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'user@test.com', password: 'user123', role: 'user' });

    // Login admin
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@test.com', password: 'admin123' });

    adminToken = adminLogin.body.token;
    adminId = adminLogin.body.data._id;

    // Login user
    const userLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@test.com', password: 'user123' });

    userToken = userLogin.body.token;
    userId = userLogin.body.data._id;
  });

  it('should allow admin to create a product', async () => {
    const uniqueSku = 'SKU-' + Date.now();

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Admin Product',
        category: 'Tech',
        price: 100,
        sku: uniqueSku,
        stock: 50,
        description: 'A product description for admin created product'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Admin Product');
  });

  it('should NOT allow regular user to create a product', async () => {
    const uniqueSku = 'SKU-' + Date.now();

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'User Product',
        category: 'Tech',
        price: 100,
        sku: uniqueSku,
        stock: 50,
        description: 'A product description for user created product'
      });

    expect(res.status).toBe(403); // Forbidden
    expect(res.body.status).toBe('error');
    expect(res.body.message).toMatch(/admin/i);
  });

  it('should NOT allow unauthenticated requests', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'NoAuth Product',
        category: 'Tech',
        price: 100,
        sku: 'SKU-NoAuth',
        stock: 50,
        description: 'A product description for no auth product'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toMatch(/token/i);
  });
});
