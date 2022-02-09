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

const likesIsEqualOrGreaterThanZero = (req, res, next) => {
  const { likes } = res.locals.body;

  if (Number.parseInt(likes, 10) < 0) {
    return next({
      status: 400,
      message: 'likes must be greater or equal to zero',
    });
  }
  next();
};

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
const create = async (req, res) => {
  const { body } = res.locals;
  const data = await service.create(body);
  return res.status(201).json({ data });
};

const read = (req, res) => {
  const { product } = res.locals;
  return res.json(product);
};

const list = async (req, res) => {
  const data = await service.list();
  return res.json({ data });
};

module.exports = {
  create: [
    passDownBodyToPipeline,
    productHasValidProperties,
    productHasRequiredProperties,
    likesIsEqualOrGreaterThanZero,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(productExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
};
