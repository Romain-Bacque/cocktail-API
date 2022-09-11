const client = require('../service/pgClient');
const CoreModel = require("./coreModel");
const ExpressError = require('../service/ExpressError')

class Cocktail extends CoreModel {
    static tableName = "unit";
    #title;

    constructor(config) {
        super(config);
        this.title = config.title;
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        if(typeof value !== 'string') {
            throw new ExpressError("title must be a string!", 400);
        }
        this.#title = value;
    }

    static async getById(id) {
        const query = {
            text: `SELECT * FROM "unit" WHERE "id" = $1;`,
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
            text: `INSERT INTO "unit" ("title") VALUES ($1) RETURNING "id", "title";`,
            values: [this.title]
        };
        const result = await client.query(query);

        if(result.rowCount > 0) {
            return result.rows[0];
        } else return null;
    }

    static async deleteOne(id) {
        const query = {
            text: `DELETE FROM "unit" WHERE "id" = $1;`,
            values: [id]
        };
        
        const result = await client.query(query);

        if(result.rowCount > 0) {
            return true;
        } else return null; 
    }
}

module.exports = Cocktail;