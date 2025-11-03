const resourceService = require('../services/resourceService');

const getAllResources = (req, res, next) => {
  try {
    const resources = resourceService.getAllResources();
    res.json(resources);
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};

const getResourceById = (req, res, next) => {
  try {
    const resource = resourceService.getResourceById(req.params.id);
    if (!resource) {
      const error = new Error('Resource not found');
      error.statusCode = 404;
      return next(error); // Pass custom error to error handler
    }
    res.json(resource);
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};

const createResource = (req, res, next) => {
  try {
    const newResource = resourceService.createResource(req.body);
    res.status(201).json(newResource);
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};

const updateResource = (req, res, next) => {
  try {
    const updatedResource = resourceService.updateResource(req.params.id, req.body);
    if (!updatedResource) {
      const error = new Error('Resource not found');
      error.statusCode = 404;
      return next(error); // Pass custom error to error handler
    }
    res.json(updatedResource);
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};

const deleteResource = (req, res, next) => {
  try {
    const deleted = resourceService.deleteResource(req.params.id);
    if (!deleted) {
      const error = new Error('Resource not found');
      error.statusCode = 404;
      return next(error); // Pass custom error to error handler
    }
    res.status(204).send();
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
};