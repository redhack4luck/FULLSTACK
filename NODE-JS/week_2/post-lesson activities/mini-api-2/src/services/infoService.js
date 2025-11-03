const packageJson = require('../../package.json');

const getProjectInfo = () => {
  return {
    name : process.env.APP_NAME || packageJson.name,
    version: packageJson.version,
    date: new Date().toISOString()
  };
};

module.exports = { getProjectInfo };