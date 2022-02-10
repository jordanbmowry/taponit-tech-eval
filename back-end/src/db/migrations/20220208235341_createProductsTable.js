/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    // Sets product_id as the primary key
    table.increments('product_id').primary();
    table.string('title');
    table.string('description');
    table.string('product_image');
    table.float('price');
    table.integer('likes');
    // Adds created_at and updated_at columns
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
