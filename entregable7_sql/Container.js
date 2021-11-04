

class Container {
    optionsConfig = Object;
    tableName = String;
    constructor(optionsConfig, tableName) {
        this.optionsConfig = optionsConfig;
        this.tableName = tableName;
    }
    async save (optionsName, tableName, element) {
        const { options } = require(`./options/${optionsName}`);
        const knex = require('knex')(options);
        knex(tableName)

    };

    async getById () {

    };

    async getAll () {

    };

    async deleteById () {

    };

    async updateById () {

    }
};
module.exports = Container;