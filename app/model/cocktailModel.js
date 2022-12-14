const client = require('../service/pgClient');
const CoreModel = require("./coreModel");
const ExpressError = require('../service/ExpressError')

class Cocktail extends CoreModel {
    static tableName = "cocktail";
    #name;
    #details;

    constructor(config) {
        super(config);
        this.name = config.name;
        this.details = config.details;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        if(typeof value !== 'string') {
            throw new ExpressError("name must be a string!", 400);
        }
        this.#name = value;
    }

    get details() {
        return this.#details;
    }

    set details(value) {
        if(typeof value !== 'object') {
            throw new ExpressError("details must be an object!", 400);
        }
        if(Object.keys(value).length !== 2) {
            throw new ExpressError("details must have two keys!", 400);
        }

        this.#details = value;
    }

    static async getById(id) {
        const query = {
            text: `SELECT * FROM "get_cocktail_details"($1);`,
            values: [id]
        };
        const result = await client.query(query);

        if(result.rowCount > 0) {
            const test =  new this(result.rows[0]);
            return test
        } else return null;
    }

    async insertOne() {

        const query = {
            text: `SELECT * FROM "insert_cocktail"($1);`,
            values: [{ name: this.name, details: this.details }]
        };
        const result = await client.query(query);

        if(result.rowCount > 0) {

            return result;
        } else return null;
    }

    async updateOne() {

        const query = {
            text: `SELECT * FROM "update_cocktail"($1);`,
            values: [{ id: this.id, name: this.name, details: this.details }]
        };
        const result = await client.query(query);

        if(result.rowCount > 0) {
            return result.rows[0];
        } else return null;
    }

    static async deleteOne(id) {
        const query = {
            text: `DELETE FROM "cocktail" WHERE "id" = $1;`,
            values: [id]
        };

        const result = await client.query(query);

        if(result.rowCount > 0) {
            return true;
        } else return null; 
    }
}

module.exports = Cocktail;