function validateResource(req, res, next) {
  const { name, description } = req.body;

  // Check if required fields are present
  if (!name || !description) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['name', 'description'],
      received: {
        name: name || 'missing',
        description: description || 'missing'
      }
    });
  }

  // Check if fields are not empty strings
  if (name.trim() === '' || description.trim() === '') {
    return res.status(400).json({
      error: 'Fields cannot be empty',
      required: ['name', 'description']
    });
  }

  // If validation passes, proceed to the next middleware/controller
  next();
}

module.exports = validateResource;