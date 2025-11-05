// kanjibo fonction sendJson mn utils, li kat3awn bach n envoyew réponse JSON const sendJson = require('../utils/sendJson');

// lfonction middleware dyal lhandling dyal les erreurs
function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}] Error on ${req.method} ${req.originalUrl}:`, err.message);
  
  // ila kan l'erreur 3ndo code dyal status kanakhdoh sinon kandiro 500 (erreur interne)
  const statusCode = err.statusCode || 500;

  // kandiro sendJson bach trj3 réponse lclient b erreur w lcode dyalha
  sendJson(res, responseData, statusCode);
}

// kanexportew lfonction bach nst3mloha f fichier akher
module.exports = errorHandler;