// Hada middleware d authentication
function auth(req, res, next) {
  // Zadna hna, khdna token men headers d request
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  // Nchofdo wach token kayna wla la
  if (!token || token !== process.env.API_TOKEN) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized - Invalid or missing token', // Token makaynatch aw machi sahla
      code: 401,
      timestamp: new Date().toISOString()
    });
  }
  
  // Ila kola 7aja mzyana, ndozo l next middleware
  next();
}

// Khrjna l function bach nst3amloha f routes
module.exports = auth;