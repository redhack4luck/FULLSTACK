const http = require('http');
const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (data) => 
  console.log('Evenement capture :', data)
)

const server = http.createServer((req, res) => {
  logger.log(`Requete recue : ${req.url}`);
  res.end('Requete enregistree !');
})

server.listen(4000, () => console.log('Serveur sur le port 4000....'));

