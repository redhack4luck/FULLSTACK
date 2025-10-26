const http = require('http');
const router = require('./router');
const logger = require('./utils/logger');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    logger.emit('request', { method: req.method, url: req.url });
    router(req, res);
    res.on('finish', () => {
        logger.emit('response', { statusCode: res.statusCode, route: req.url });
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log("-----------------------------------------");
    console.log("Listening for requests (Ctrl+C to stop)...");
});