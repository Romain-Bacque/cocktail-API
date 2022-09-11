const client = require('../service/pgClient');

class CoreModel {
  #id;
  #created_at;
  #updated_at;

  static tableName = null;

  constructor(config) {
    this.#id = config.id;
    this.#created_at = config.created_at;
    this.#updated_at = config.updated_at;
  }

  get id() {
    return this.#id;
  }

  get created_at() {
    return this.#created_at;
  }

  get updated_at() {
    return this.#updated_at;
  }

  static async getAll() {
    const query = {
      text: this.tableName !== 'unit' ? `SELECT * FROM "get_${this.tableName}s_details"();` : `SELECT * FROM "unit";`
    }
    const result = await client.query(query);

    if (result.rowCount > 0) {
      const rows = result.rows;
      const items = [];
      for (const row of rows) {
        items.push(new this(row));
      }

      return items;
    } else return null;
  }
}

module.exports = CoreModel;