const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./products.service');

// validation middleware
const productExists = async (req, res, next) => {
  const { id } = req.params;

  const product = await service.read(id);
  if (!product) {
    return next({
      status: 404,
      message: `Product with product_id: ${id} does not exist`,
    });
  }
  res.locals.product = product;
  next();
};

// CRUDL
const read = (req, res) => {
  const { product } = res.locals;
  return res.json(product);
};

const list = async (req, res) => {
  const data = await service.list();
  return res.json({ data });
};

module.exports = {
  read: [asyncErrorBoundary(productExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
};
