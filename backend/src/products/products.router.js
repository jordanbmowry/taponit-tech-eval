// middleware to handle http verbs not allowed
const methodNotAllowed = require('../errors/methodNotAllowed');
// router for products resource
const router = require('express').Router();
const controller = require('./products.controller');
// /products
router.route('/').get(controller.list).all(methodNotAllowed);

module.exports = router;