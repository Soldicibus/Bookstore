import pool from "../../db.js";

class PublisherModel {
  static async findAll(db = pool) {
    const query = `SELECT * FROM publishers`;
    try {
      const result = await db.query(query);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding publishers`, error);
      throw new Error("Could not retrieve publishers data due to a database error.");
    }
  }

  static async findById(id, db = pool) {
    const query = `SELECT * FROM publishers WHERE id=$1`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error finding publisher ${id}:`, error);
      throw new Error("Could not retrieve publisher data due to a database error.");
    }
  }

  static async create(name, description, db = pool) {
    const query = `INSERT INTO publishers (name, description) VALUES ($1, $2) RETURNING *`;
    const values = [name, description];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error creating publisher:`, error);
      throw new Error("Could not create publisher due to a database error.");
    }
  }

  static async update(id, name, description, db = pool) {
    const query = `UPDATE publishers SET name=$1, description=$2 WHERE id=$3 RETURNING *`;
    const values = [name, description, id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error updating publisher ${id}:`, error);
      throw new Error("Could not update publisher due to a database error.");
    }
  }

  static async delete(id, db = pool) {
    const query = `DELETE FROM publishers WHERE id=$1 RETURNING *`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error deleting publisher ${id}:`, error);
      throw new Error("Could not delete publisher due to a database error.");
    }
  }
}

export default PublisherModel;
