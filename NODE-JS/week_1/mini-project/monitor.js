#!/usr/bin/env node
// Kansift module os bach nkhdmo info système
const os = require('os');
// Kansift Logger li drna f logger.js
const Logger = require('./logger');

// Kansayb instance men Logger
const logger = new Logger();

// Fonction li katsayb info système w katkteb f log.txt
function collectSystemInfo() {
  const freeMem = os.freemem(); // Mémoire libre f bytes
  const totalMem = os.totalmem(); // Mémoire totale f bytes
  const uptime = os.uptime(); // Temps li b9a depuis démarrage f seconds
  const percentFree = ((freeMem / totalMem) * 100).toFixed(2); // % mémoire libre

  // Message li ghadi nktbo f log
  const message = `

 Time: ${new Date().toLocaleString()}
 Free Memory: ${(freeMem / 1024 / 1024).toFixed(2)} MB
 Total Memory: ${(totalMem / 1024 / 1024).toFixed(2)} MB
 Free Memory %: ${percentFree}%
 Uptime: ${(uptime / 60).toFixed(2)} min

`;

  logger.log(message); // ktb message f log
  logger.checkMemory(freeMem, totalMem); // check lowMemory
}

// Écoute événement lowMemory
logger.on('lowMemory', (data) => {
  console.log(` Alerte: Mémoire faible (${data.percentFree}%) à ${data.date}`);
  logger.log(` Alerte: Mémoire faible (${data.percentFree}%)`);
});

// Kan3yto lfonction kol 5 secondes
setInterval(collectSystemInfo, 5000);
