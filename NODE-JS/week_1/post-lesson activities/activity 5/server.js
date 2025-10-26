const http = require('http');

// HNA CREANA WHD SERVER 
const server = http.createServer((req, res) => {
  // DB KN3TTIW DES REPONSES 3LA 7SAB LA ROUTE
  if (req.url === '/') {
    res.write('Bienvenue sur notre serveur Node.js');
    res.end();
  }
  else if (req.url === '/api/etudiants') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(['Redouane', 'Amine', 'Mohamed', 'Lamya']));
  }
  else {
    res.writeHead(404);
    res.end('Page non trouvee');
  }
});

server.listen(3000, () => {
  console.log('Serveur en ecoute sur le port 3000....');
})