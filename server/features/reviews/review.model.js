import pool from "../../db.js";

class ReviewModel {
  static async findAll(db = pool) {
    const query = `SELECT * FROM reviews`;
    try {
      const result = await db.query(query);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding reviews`, error);
      throw new Error(
        "Could not retrieve reviews data due to a database error.",
      );
    }
  }

  static async findById(id, db = pool) {
    const query = `SELECT * FROM reviews WHERE id=$1`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error finding review ${id}:`, error);
      throw new Error(
        "Could not retrieve review data due to a database error.",
      );
    }
  }

  static async create(title, description, rating, user_id, book_id, db = pool) {
    const query = `INSERT INTO reviews (title, description, rating, user_id, book_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [title, description, rating, user_id, book_id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error creating review:`, error);
      throw new Error("Could not create review due to a database error.");
    }
  }

  static async update(
    id,
    title,
    description,
    rating,
    user_id,
    book_id,
    db = pool,
  ) {
    const query = `UPDATE reviews SET title=$1, description=$2, rating=$3, user_id=$4, book_id=$5, updated_at=NOW() WHERE id=$6 RETURNING *`;
    const values = [title, description, rating, user_id, book_id, id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error updating review ${id}:`, error);
      throw new Error("Could not update review due to a database error.");
    }
  }

  static async delete(id, db = pool) {
    const query = `DELETE FROM reviews WHERE id=$1 RETURNING *`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error deleting review ${id}:`, error);
      throw new Error(
        "Could not delete review due to a database error.",
      );
    }
  }
}

export default ReviewModel;
