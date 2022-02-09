const products = require('./00-products.json');

exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE products RESTART IDENTITY CASCADE')
    .then(() => knex('products').insert(products));
};
