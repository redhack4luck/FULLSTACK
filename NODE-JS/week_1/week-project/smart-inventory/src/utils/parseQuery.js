// src/utils/parseQuery.js
const url = require('url');

function parseQuery(req) {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query; 
    const minPrice = parseFloat(query.minPrice);
    const maxPrice = parseFloat(query.maxPrice);
    if (minPrice && maxPrice && minPrice > maxPrice) {
        throw new Error("400: minPrice cannot be greater than maxPrice.");
    }
        const page = parseInt(query.page);
    const limit = parseInt(query.limit);

    if ((query.page && (!Number.isInteger(page) || page < 1)) || 
        (query.limit && (!Number.isInteger(limit) || limit < 1))) {
        throw new Error("400: Pagination parameters 'page' and 'limit' must be positive integers.");
    }

    return {
        pathname: parsedUrl.pathname,
        query: query
    };
}

module.exports = parseQuery;