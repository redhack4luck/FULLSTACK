// GA3 LES ACTIVITES RAHOM MAJMO3IN FHAD LE FICHIER PUISQUE DKCHI LIE
// BNISBA LES REPONSES DIAL DISCUSSION RTL9AHOM F "DISCUSSION.txt"
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// KNST3MLO MIDDLEWARE DIAL STATIC 3LA DIR 'PUBLIC'
app.use(express.static('public'));
app.use('/static', express.static('public'));
// KNST3MLO WHD LOGGING MIDDLEWARE BACH LOGGIW REQUESTS F CONSOLE
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
})
// HD MIDDLEWARE KI RECORDI DATE DIAL REQUEST 
app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});
// MN BA3D SAWBNA ROUTES DIALNA KAMLIN FHAD PARTIE
app.get('/ping', (req, res) => {
  const duration = Date.now() - req.startTime;
  res.json({message: 'ping', duration: `${duration} ms`});
});
app.get('/', (req, res) => {
  res.send('Bienvenue sur le premier Serveur Express');
});
// HAD ROUTE BONUS POUR servir 'index.html' WAKHA MA MATLOBACH
app.get('/static', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/products', (req, res) => {
  const data = fs.readFileSync('./data/products.json');
  const products = JSON.parse(data);
  res.json(products);
});
/* HAD LA ROUTE KANT HIA LAWLA WLKN KAYNA ROUTE 3NDHA SAME NAME, 
   SO LABRITI TESTER LAWLA DIR HADI EN COMMENTAIRE OLA 9LAB L'ORDER */
app.get('/api/products', (req, res) => {
  res.json([{id: 1, name: 'Laptop'}, {id: 2, name: 'Phone'}]);
});

app.get('/api/products/:id', (req, res) => {
  res.json({message: `Produit ${req.params.id}`});
});

// FHAD LA ROUTE KNSIMULIW WHD error li knpassiwha l middleware (errors handler)
app.get('/api/crash', (req, res, next) => {
  const err = new Error('Erreur simulee');
  next (err);
});
// HNA KNGEREW GA3 LES ERREURS LI PASSINAHOM B LA FONCTION next(err)
app.use((err, req, res, next) => {
  console.error('Erreur detectee :', err.message);
  res.status(500).json({ error: err.message });
});


app.listen(3000, () => {
  console.log('Serveur en ecoute sur http://localhost:3000');
});
