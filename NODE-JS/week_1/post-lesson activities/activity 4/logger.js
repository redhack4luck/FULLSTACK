const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    console.log('LOG :', message);
    this.emit('messageLogged', { message, date: new Date() });
  }
}

module.exports = Logger;