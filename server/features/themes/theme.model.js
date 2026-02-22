import pool from "../../db.js";

class ThemeModel {
  static async findAll(db = pool) {
    const query = `SELECT * FROM thematics`;
    try {
      const result = await db.query(query);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding thematics`, error);
      throw new Error("Could not retrieve thematics data due to a database error.");
    }
  }

  static async findById(id, db = pool) {
    const query = `SELECT * FROM thematics WHERE id=$1`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error finding thematic ${id}:`, error);
      throw new Error("Could not retrieve thematic data due to a database error.");
    }
  }

  static async create(name, db = pool) {
    const query = `INSERT INTO thematics (name) VALUES ($1) RETURNING *`;
    const values = [name];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error creating thematic:`, error);
      throw new Error("Could not create thematic due to a database error.");
    }
  }

  static async update(id, name, db = pool) {
    const query = `UPDATE thematics SET name=$1 WHERE id=$2 RETURNING *`;
    const values = [name, id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error updating thematic ${id}:`, error);
      throw new Error("Could not update thematic due to a database error.");
    }
  }

  static async delete(id, db = pool) {
    const query = `DELETE FROM thematics WHERE id=$1 RETURNING *`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error deleting thematic ${id}:`, error);
      throw new Error("Could not delete thematic due to a database error.");
    }
  }
}

export default ThemeModel;
