const infoService = require('../services/infoService');

const getInfo = (req, res) => {
  const info = infoService.getProjectInfo();
  res.json(info);
}

module.exports = { getInfo };