// validateReq hiya lmiddleware li katverifyi wach data jaya mzyana
function validateReq(req, res, next) {
  const { title, dueDate, priority } = req.body;

  // ila ma kanch title katrj3 erreur 400 (bad request) 
  if (!title) {
    return res.status(400).json({
      message: 'Title is required' 
    });
  }

  // ila ma kanch dueDate katrj3 erreur 400
  if (!dueDate) {
    return res.status(400).json({
      message: 'Due date is required' 
    });
  }

  // kat3ref les valeurs li dayzin f priority
  const validPriorities = ['low', 'medium', 'high'];

  // ila priority ma kaynach f had la liste katrje3 erreur
  if (!priority || !validPriorities.includes(priority)) {
    return res.status(400).json({
      message: 'Priority must be one of: low, medium, or high' // khas tkoun wa7da mn 3
    });
  }

  // ila kolchi mzyan katmchi lmiddleware li mn wraha
  next();
}

// flkher kanexportew lfonction 
module.exports = validateReq;