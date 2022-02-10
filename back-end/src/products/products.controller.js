const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./products.service');
const passDownBodyToPipeline = require('../utils/passDownBodyToPipeline');
const hasOnlyValidProperties = require('../errors/hasOnlyValidProperties');
const hasProperties = require('../errors/hasProperties');

// validation middleware
const VALID_PROPERTIES = [
  'title',
  'description',
  'product_image',
  'price',
  'likes',
];

// validate the product has only valid properties
const productHasValidProperties = hasOnlyValidProperties(VALID_PROPERTIES);
// validate the product has all valid properties
const productHasRequiredProperties = hasProperties(...VALID_PROPERTIES);

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

// POST /products
const create = async (req, res) => {
  const { body } = res.locals;
  const data = await service.create(body);
  return res.status(201).json({ data });
};
// GET /products/:id
const read = (req, res) => {
  const { product } = res.locals;
  return res.json(product);
};
// PUT /products/:id
const update = async (req, res) => {
  const updatedProduct = {
    ...res.locals.body,
    product_id: req.params.id,
  };
  const data = await service.update(updatedProduct);
  return res.json({ data });
};
// DELETE /products/:id
const destroy = async (req, res) => {
  const { id } = req.params;
  await service.delete(id);
  res.sendStatus(204);
};
// GET /products
const list = async (req, res) => {
  const data = await service.list();
  return res.json({ data });
};

module.exports = {
  create: [
    passDownBodyToPipeline,
    productHasValidProperties,
    productHasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(productExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
  update: [
    passDownBodyToPipeline,
    asyncErrorBoundary(productExists),
    productHasValidProperties,
    productHasRequiredProperties,
    update,
  ],
  delete: [asyncErrorBoundary(productExists), asyncErrorBoundary(destroy)],
};
