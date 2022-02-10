const knex = require('../db/connection');
// CRUDL

// POST /products
// INSERT INTO table_name(column1, column2, …)
// VALUES (value1, value2, …);
const create = (product) => {
  return knex('products')
    .insert(product)
    .returning('*')
    .then((newProduct) => newProduct[0]);
};
// SELECT * FROM products WHERE product_id = id;
// GET /products/:id
const read = (id) => {
  return knex('products').select('*').where({ product_id: id }).first();
};
/* UPDATE products
SET column1 = value1,
    column2 = value2,
    ...
WHERE condition;
PUT /products/:id
*/
const update = (updatedProduct) => {
  const { product_id } = updatedProduct;
  return knex('products')
    .select('*')
    .where({ product_id })
    .update(updatedProduct, '*')
    .then((updated) => updated[0]);
};

// SELECT * FROM products;
// GET /products
const list = () => {
  return knex('products').select('*');
};
// DELETE FROM table_name
// WHERE condition;
// DELETE /products/:id
const destroy = (id) => {
  return knex('products').where({ product_id: id }).del();
};

module.exports = {
  create,
  read,
  update,
  list,
  delete: destroy,
};
