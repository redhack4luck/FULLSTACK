const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/user.model');
const Product = require('../../src/models/product.model');

describe('Auth and Order flow', () => {
  let adminToken;
  let adminId;
  let productId;

  beforeAll(async () => {
    // Nettoyer les utilisateurs et produits de test
    await User.deleteMany({ email: /admin@example.com/ });
    await Product.deleteMany({});

    // Créer l'admin
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });

    // Se logger pour récupérer un token valide
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123',
      });

    adminToken = loginRes.body.token;
    adminId = loginRes.body.data._id; // Sauvegarder l'ID de l'utilisateur
  });

  describe('Admin creates a product', () => {
    it('should create a new product', async () => {
      const uniqueSku = 'SKU-' + Date.now(); // SKU unique pour éviter les duplications
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Product',
          category: 'Test Category',
          price: 50,
          sku: uniqueSku,
          stock: 100,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id'); // Selon ton retour API
      expect(res.body.name).toBe('Test Product');

      productId = res.body._id; // Sauvegarder pour créer la commande
    });
  });

  describe('Create order with the product', () => {
    it('should create a new order', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          userId: adminId,
          items: [
            {
              productId: productId,
              quantity: 2,
            },
          ],
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('status', 'success');
      expect(res.body.data).toHaveProperty('items');
      expect(res.body.data.totalAmount).toBe(100);
      expect(res.body.data.user).toBe(adminId); // Vérifie que l’ordre appartient bien à l’admin
    });
  });
});
