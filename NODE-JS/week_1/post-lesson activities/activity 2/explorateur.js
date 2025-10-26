const fs = require('fs');
const path = require('path');
// KN3AYTO 3LA method readdir bach l9aw ga3 files likaynin dial directory
// I used __dirname bach nkhdam 3la directory li ana fih ana fwa9t dial execution
fs.readdir(__dirname, (err, files) => {
  if (err) return console.error('Erreur :', err.message);
  console.log('Contenu du dossier :', files);
  // HNA JMA3NA PATH DIAL DIR M3A LFILES 
  files.forEach(f => console.log(path.join(__dirname, f)));
});