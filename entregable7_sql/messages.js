const { options } = require('./options/mariaDB');

const knex = require('knex')(options);

knex.schema.createTable('messages', (table) => {
    table.increments('id');
    table.string('mensaje');
    table.string('usuario');
    table.integer('price');
    table.time('created_at')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
    .then(() => console.log('Table Mensajes created'))
    .catch((error) => { console.error(error); throw error; })
    .finally(() => knex.destroy())