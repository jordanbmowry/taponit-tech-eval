// middleware to handle http verbs not allowed
const methodNotAllowed = require('../errors/methodNotAllowed');
// router for products resource
const router = require('express').Router();
const controller = require('./products.controller');

// /products/:id
router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

// /products
router
  .route('/')
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
