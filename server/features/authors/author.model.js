import pool from "../../db.js";

class AuthorModel {
  static async findAll(db = pool) {
    const query = `SELECT * FROM authors`;
    try {
      const result = await db.query(query);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding authors`, error);
      throw new Error("Could not retrieve authors data due to a database error.");
    }
  }
  
  static async findById(id, db = pool) {
    const query = `SELECT * FROM authors WHERE id=$1`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error finding author ${id}:`, error);
      throw new Error("Could not retrieve author data due to a database error.");
    }
  }

  static async create(name, surname, patronym, description, db = pool) {
    const query = `INSERT INTO authors (name, surname, patronym, description) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [name, surname, patronym, description];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error creating author:`, error);
      throw new Error("Could not create author due to a database error.");
    }
  }

  static async update(id, name, surname, patronym, description, db = pool) {
    const query = `UPDATE authors SET name=$1, surname=$2, patronym=$3, description=$4 WHERE id=$5 RETURNING *`;
    const values = [name, surname, patronym, description, id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error updating author ${id}:`, error);
      throw new Error("Could not update author due to a database error.");
    }
  }

  static async delete(id, db = pool) {
    const query = `DELETE FROM authors WHERE id=$1 RETURNING *`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error deleting author ${id}:`, error);
      throw new Error("Could not delete author due to a database error.");
    }
  }
}

export default AuthorModel;
