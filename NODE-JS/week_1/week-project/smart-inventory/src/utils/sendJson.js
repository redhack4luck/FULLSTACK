function sendJson(res, status, content) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(content));   
}

module.exports = sendJson;