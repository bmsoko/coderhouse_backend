const knex = require('knex');

class Container {
    optionsConfig = Object;
    tableName = String;
    constructor(config, table) {
        this.table = table;
        this.conn = knex(config);
      }

    async save(producto) {
        try {
        const [id] = await this.conn(this.table).insert(producto);
        return id; 
        } catch (error) {
        console.error(error); throw error;
        }
    }

    async getById(id) {
        try {
          const content = await this.conn.from(this.table)
            .select('*').where('id', '=', id);
          if (content.length === 0) {
            return null;
          } else {
            return content[0];
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

      async getAll() {
        try {
          const rows = await this.conn.from(this.table)
            .select('*');
          return rows;
        } catch (error) {
          console.error('Error:', error);
        }
      }
    

    async deleteById (id) {
        try {
            const content = await this.conn.from(this.table)
              .del('*').where('id', '=', id);
            if (content.length === 0) {
              return null;
            } else {
              return content[0];
            }
          } catch (error) {
            console.error('Error:', error);
          }
    };

    async updateById (id, updates) {
        for (var [key, value] of Object.entries(updates)) {
            try {
                const content = await this.conn.from(this.table)
                  .where(id).update({key: value});
                if (content.length === 0) {
                  return null;
                } else {
                  return content[0];
                }
              } catch (error) {
                console.error('Error:', error);
              }
        }
    }
};
module.exports = Container;