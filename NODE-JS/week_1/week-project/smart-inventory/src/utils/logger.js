const EventEmitter = require('events');

class Logger extends EventEmitter {
    constructor() {
        super();
        
        this.on('request', ({ method, url }) => {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] REQUEST: ${method} ${url}`);
        });

        this.on('response', ({ statusCode, route }) => {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] RESPONSE: ${statusCode} for route ${route}`);
        });
    }
}

module.exports = new Logger();