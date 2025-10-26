const fs = require('fs');
const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    fs.appendFileSync('log.txt', message + '\n');
    this.emit('messageLogged', { message, date: new Date() });
  }
}

module.exports = Logger;