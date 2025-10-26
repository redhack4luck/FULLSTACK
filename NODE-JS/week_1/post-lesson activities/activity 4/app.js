const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (data) => {
  console.log('Evenement capture :', data);
});

logger.log('Application demarree !');


// DISCUSSION

// QUESTION 1
/* La difference entre une instance directe d'EventEmitter et une classe qui l'etend
   c'est qu'on peut la personnaliser en ajouter des attributs et des methodes
*/
// QUESTION 2
/* L'encapuslation en classe permet une meilleure protection
*/
