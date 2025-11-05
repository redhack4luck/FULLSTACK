// lfonction logger hiya lmiddleware li katsjel koula requête fl console
function logger(req, res, next) {
  const start = Date.now();

  // mli katsali lréponse kan7sebo ch7al dkhlat o khrjat bl ms
  res.on('finish', () => {
    const duration = Date.now() - start; 
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });

  // kandouzo l next middleware
  next();
}

// kanexportew lfonction
module.exports = logger;