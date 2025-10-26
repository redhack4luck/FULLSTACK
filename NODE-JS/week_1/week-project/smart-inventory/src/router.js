const url = require('url');
const os = require('os');
const productsController = require('./controllers/productController');
const ordersController = require('./controllers/orderController');
const sendJson = require('./utils/sendJson');

const getAllProducts = productsController.getAllProduct;
const getOneProduct = productsController.getProductByid;
const getProductBySku = productsController.getProductBySku;
const getProductByCategory = productsController.getProductByCategory;

const getAllOrders = ordersController.getAllOrders;
const getOrderById = ordersController.getOrderById;
const getOrderByNumber = ordersController.getOrderByNumber;

const routes = [
    {
        method: 'GET',
        path: '/health',
        handler: (req, res) => {
            sendJson(res, 200, {
                status: "ok",
                uptime: os.uptime(),
                timestamp: new Date().toISOString()
            });
        },
        dynamic: false
    },

    // --- Product Routes ---
    {
        method: 'GET',
        path: '/api/products',
        handler: getAllProducts,
        dynamic: false
    },
    {
        method: 'GET',
        path: /^\/api\/products\/(\d+)$/,
        handler: (req, res, match) => getOneProduct(req, res, match[1]),
        dynamic: true
    },
    {
        method: 'GET',
        path: /^\/api\/products\/sku\/([A-Z-]+-\d{3,4})$/,
        handler: (req, res, match) => getProductBySku(req, res, match[1]),
        dynamic: true
    },
    {
        method: 'GET',
        path: /^\/api\/products\/category\/(\w+)$/, 
        handler: (req, res, match) => getProductByCategory(res, req, match[1]), 
        dynamic: true
    },
    
    // --- Order Routes ---
    {
        method: 'GET',
        path: '/api/orders',
        handler: getAllOrders,
        dynamic: false
    },
    {
        method: 'GET',
        path: /^\/api\/orders\/(\d+)$/, 
        handler: (req, res, match) => getOrderById(req, res, match[1]),
        dynamic: true
    },
    {
        method: 'GET',
        path: /^\/api\/orders\/number\/([A-Z]{3,}-\d{4}-\d{4})$/, 
        handler: (req, res, match) => getOrderByNumber(req, res, match[1]),
        dynamic: true
    },
    {
        method: 'GET',
        path: '/api/export.gz',
        handler: productsController.exportProducts,
        dynamic: false
    },
];

function routeRequest(req, res) {
    const { pathname } = url.parse(req.url);

    const staticRoute = routes.find(r => !r.dynamic && r.method === req.method && r.path === pathname);
    if (staticRoute) {
        return staticRoute.handler(req, res);
    }

    const dynamicRoute = routes.find(r => r.dynamic && r.method === req.method && r.path.test(pathname));
    if (dynamicRoute) {
        const match = pathname.match(dynamicRoute.path);
        return dynamicRoute.handler(req, res, match);
    }

    sendJson(res, 404, { error: "Not Found", message: `Route ${req.method} ${pathname} not found` });
}

module.exports = routeRequest;