// Bnisba les questions dial discussion ra kaynin mora lcode en commentaire

const os = require('os');

console.log('Plateforme         :', os.platform());
console.log('Architecture       :', os.arch());
console.log('CPU                :', os.cpus().length, 'coeurs');
console.log('Memoire totale     :', os.totalmem());
console.log('Memooire libre     :', os.freemem());
console.log('Uptime en (heures) :', (os.uptime()/3600).toFixed(2));

// Question 1
/* os.platform() ktraj3 systeme d'exploitation
   alors que os.arch() ktraj3 lina l'architecture dial system (32, 64)
*/

// Question 2 
/* had les informations n9adro nsawbo bihom whd interface health ola state dial server
   ainsi rtkon 3ndna une visibilite 3la l'etat dial server
*/