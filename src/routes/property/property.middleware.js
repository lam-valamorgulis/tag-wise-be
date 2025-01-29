// Middleware to validate the property ID
function validatePropertyId(req, res, next) {
  const propertyId = req.params.id;

  // Example: Validate if the ID is a 32-character alphanumeric string
  if (!propertyId || !/^[a-zA-Z0-9]{34}$/.test(propertyId)) {
    return res.status(400).json({
      error:
        'Invalid property ID. ID must be a 32-character alphanumeric string.',
    });
  }

  // If validation passes, proceed to the next middleware/controller
  next();
}

module.exports = { validatePropertyId };
