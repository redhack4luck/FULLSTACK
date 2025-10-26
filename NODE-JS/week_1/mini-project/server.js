// Kansift module http bach nkhdmo serveur
const http = require('http');
// Kansift module fs bach nqra fichier log.txt
const fs = require('fs');
// Kansift module os bach n9dro n3tiw stats JSON
const os = require('os');

// Kansayb serveur
const server = http.createServer((req, res) => {
  // Route racine "/"
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bienvenue sur le Node System Logger');
  }

  // Route "/logs" li katban contenu dial log.txt
  else if (req.url === '/logs') {
    fs.readFile('log.txt', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erreur lors de la lecture du fichier log.txt');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(data);
      }
    });
  }

  // Route "/stats" li katban dernieres stats système en JSON
  else if (req.url === '/stats') {
    const stats = {
      time: new Date().toLocaleString(),
      freeMemoryMB: (os.freemem() / 1024 / 1024).toFixed(2),
      totalMemoryMB: (os.totalmem() / 1024 / 1024).toFixed(2),
      freeMemoryPercent: ((os.freemem() / os.totalmem()) * 100).toFixed(2),
      uptimeMinutes: (os.uptime() / 60).toFixed(2),
    };

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(stats, null, 2));
  }

  // Si route inconnue
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Page non trouvée');
  }
});

// Serveur écoute sur port 3000
server.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
