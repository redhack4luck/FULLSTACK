// Kansift lmodule EventEmitter bach nkhdmo events
const EventEmitter = require('events');
// Kansift lmodule fs bach n9raw o nktbo fichier
const fs = require('fs');

class Logger extends EventEmitter {
  // Fonction li katkteb message f log.txt
  log(message) {
    // Kan3tiw timestamp li kayban f HH:MM:SS
    const timestamp = new Date().toLocaleTimeString();

    // Kan9raw fichier log.txt w kanzido lih message
    fs.appendFile('log.txt', `[${timestamp}] ${message}\n`, (err) => {
      if (err) console.error(' Erreur d’écriture dans log.txt:', err);
      else console.log('Message enregistré avec succès');
    });

    // Emit événement normal bach notification
    this.emit('messageLogged', { message, date: new Date() });
  }

  // Fonction li katsayb alert ila mémoire khawya
  checkMemory(freeMem, totalMem) {
    const percentFree = (freeMem / totalMem) * 100;

    // Ila mémoire < 20%, kaydir événement lowMemory
    if (percentFree < 20) {
      this.emit('lowMemory', {
        percentFree: percentFree.toFixed(2),
        date: new Date().toLocaleTimeString(),
      });
    }
  }
}

module.exports = Logger;
