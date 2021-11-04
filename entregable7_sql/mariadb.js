const { options } = require('./options/mariaDB');

const knex = require('knex')(options);

knex.schema.createTable('products', (table) => {
  table.increments('id');
  table.string('title');
  table.string('thumbnail');
  table.integer('price');
})
  .then(() => console.log('Table created'))
  .catch((error) => { console.error(error); throw error; })
  .finally(() => knex.destroy())