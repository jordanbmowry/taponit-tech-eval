const knex = require('../db/connection');
// SELECT * FROM products;
const list = () => {
  return knex('products').select('*');
};

module.exports = {
  list,
};
