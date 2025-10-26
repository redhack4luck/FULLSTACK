const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('userConnected', (data) => {
  console.log(`New connection : ${data.name} (${data.id})`);
});

emitter.emit('userConnected', { id: 1, name: 'Redouane'});

// DISCUSSION :

// QUESTSION 1
// Si l'ecouteur est enregistre apres l'emission de l'evenement l'action associee a l'event ne sera pas declenchee

// QUESTION 2
// Bien sur on peut avoir plusieurs ecouteurs pour plusieurs evenements