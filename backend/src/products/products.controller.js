const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./products.service');

// CRUDL

const list = async (req, res) => {
  const data = await service.list();
  return res.json({ data });
};

module.exports = { list: asyncErrorBoundary(list) };
