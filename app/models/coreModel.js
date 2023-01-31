const pool = require("../service/pgPool");

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
      text:
        this.tableName !== "unit"
          ? `SELECT * FROM "get_${this.tableName}s_details"();`
          : `SELECT * FROM "unit";`,
    };
    const result = await pool.query(query);

    if (result.rowCount > 0) {
      const rows = result.rows;
      const items = [];

      for (const row of rows) {
        items.push(new this(row));
      }
      return items;
    } else return null;
  }

  static async deleteOne(id) {
    const query = {
      text: `DELETE FROM "${this.tableName}" WHERE "id" = $1;`,
      values: [id],
    };

    const result = await pool.query(query);

    return result.rowCount > 0;
  }
}

module.exports = CoreModel;
