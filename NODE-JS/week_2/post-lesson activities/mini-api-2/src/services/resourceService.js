const fs = require('fs');
const path = require('path');

// Path to our data file
const dataPath = path.join(__dirname, '../../data/resources.json');

// Helper functions to read and write data
const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data file:', error);
    throw new Error('Could not save data');
  }
};

// Service functions
function getAllResources() {
  return readData();
}

function getResourceById(id) {
  const resources = readData();
  return resources.find(resource => resource.id === parseInt(id));
}

function createResource(resourceData) {
  const resources = readData();
  
  // Generate new ID
  const newId = resources.length > 0 
    ? Math.max(...resources.map(r => r.id)) + 1 
    : 1;
  
  const newResource = {
    id: newId,
    ...resourceData
  };
  
  resources.push(newResource);
  writeData(resources);
  return newResource;
}

function updateResource(id, resourceData) {
  const resources = readData();
  const resourceIndex = resources.findIndex(resource => resource.id === parseInt(id));
  
  if (resourceIndex === -1) return null;
  
  // Update the resource while keeping the original ID
  const updatedResource = { 
    ...resources[resourceIndex], 
    ...resourceData,
    id: parseInt(id) // Ensure ID doesn't get changed
  };
  
  resources[resourceIndex] = updatedResource;
  writeData(resources);
  return updatedResource;
}

function deleteResource(id) {
  const resources = readData();
  const resourceIndex = resources.findIndex(resource => resource.id === parseInt(id));
  
  if (resourceIndex === -1) return false;
  
  resources.splice(resourceIndex, 1);
  writeData(resources);
  return true;
}

// Export all service functions
module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
};