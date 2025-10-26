const ordersService = require('../services/orderService');
const sendJson = require('../utils/sendJson');
const parseQuery = require('../utils/parseQuery');

function getAllOrders(req, res) {
    let query;
    try {
        ({ query } = parseQuery(req)); 
        const result = ordersService.getAll(query);
        sendJson(res, 200, result);
    } catch (e) {
        if (e.message.startsWith('400')) {
             sendJson(res, 400, { 
                 error: "Bad Request", 
                 message: e.message.replace('400: ', '') 
             });
        } 
        else if (e.message.startsWith('500')) {
            sendJson(res, 500, { 
                error: "Internal Server Error", 
                message: e.message.replace('500: ', '') 
            });
        } 
        else {
             sendJson(res, 500, { error: "Unexpected Server Error", message: e.message });
        }
    }
}

function getOrderById(req, res, id) {
    try {
        const order = ordersService.getById(id);
        if (order) {
            sendJson(res, 200, order);
        } else {
            sendJson(res, 404, { error: "Not Found", message: `Order with ID ${id} not found` });
        }
    } catch (e) {
        sendJson(res, 500, { error: "Internal Server Error" });
    }
}

function getOrderByNumber(req, res, orderNumber) {
    try {
        const order = ordersService.getByNumber(orderNumber);
        if (order) {
            sendJson(res, 200, order);
        } else {
            sendJson(res, 404, { error: "Not Found", message: `Order with number ${orderNumber} not found` });
        }
    } catch (e) {
        sendJson(res, 500, { error: "Internal Server Error" });
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    getOrderByNumber
};