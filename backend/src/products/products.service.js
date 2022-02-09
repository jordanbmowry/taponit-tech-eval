const knex = require('../db/connection');
// SELECT * FROM products;
// GET /products
const list = () => {
  return knex('products').select('*');
};
// SELECT * FROM products WHERE product_id = id;
// GET /products/:id
const read = (id) => {
  return knex('products').select('*').where({ product_id: id }).first();
};

module.exports = {
  list,
  read,
};
