import pool from "../../db.js";

class GenreModel {
  static async findAll(db = pool) {
    const query = `SELECT * FROM genres`;
    try {
      const result = await db.query(query);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding genres`, error);
      throw new Error("Could not retrieve genres data due to a database error.");
    }
  }

  static async findById(id, db = pool) {
    const query = `SELECT * FROM genres WHERE id=$1`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error finding genre ${id}:`, error);
      throw new Error("Could not retrieve genre data due to a database error.");
    }
  }

  static async create(name, db = pool) {
    const query = `INSERT INTO genres (name) VALUES ($1) RETURNING *`;
    const values = [name];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error creating genre:`, error);
      throw new Error("Could not create genre due to a database error.");
    }
  }

  static async update(id, name, db = pool) {
    const query = `UPDATE genres SET name=$1 WHERE id=$2 RETURNING *`;
    const values = [name, id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error updating genre ${id}:`, error);
      throw new Error("Could not update genre due to a database error.");
    }
  }

  static async delete(id, db = pool) {
    const query = `DELETE FROM genres WHERE id=$1 RETURNING *`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error deleting genre ${id}:`, error);
      throw new Error("Could not delete genre due to a database error.");
    }
  }
}

export default GenreModel;
