const express = require('express');
const ordersController = require('../controllers/orders.controller');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const validate=require('../middlewares/validator');
const {orderSchema}=require('../validator/order.validator');
const router = express.Router();
router.get('/',auth, ordersController.listOrders);
router.get('/:id', ordersController.getOrder);


router.post('/', 
    auth,   
    authorize('user',  'admin'),
    validate(orderSchema),
    ordersController.createOrder);

module.exports = router;
