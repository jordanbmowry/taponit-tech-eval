const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./products.service');

// CRUDL

const read = async (req, res) => {
  const { id } = req.params;
  const product = await service.read(id);
  return res.json(product);
};

const list = async (req, res) => {
  const data = await service.list();
  return res.json({ data });
};

module.exports = {
  read: asyncErrorBoundary(read),
  list: asyncErrorBoundary(list),
};
