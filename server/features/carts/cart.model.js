import pool from "../../db.js";

class CartModel {
  static async findAll(db = pool) {
    const query = `SELECT * FROM carts`;
    try {
      const result = await db.query(query);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding carts`, error);
      throw new Error("Could not retrieve carts data due to a database error.");
    }
  }

  static async findById(id, db = pool) {
    const query = `SELECT * FROM carts WHERE id=$1`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error finding cart ${id}:`, error);
      throw new Error("Could not retrieve cart data due to a database error.");
    }
  }

  static async create(userId, db = pool) {
    const query = `INSERT INTO carts (user_id) VALUES ($1) RETURNING *`;
    const values = [userId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error creating cart:`, error);
      throw new Error("Could not create cart due to a database error.");
    }
  }

  static async delete(id, db = pool) {
    const query = `DELETE FROM carts WHERE id=$1 RETURNING *`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error deleting cart ${id}:`, error);
      throw new Error("Could not delete cart due to a database error.");
    }
  }

  static async addItem(cartId, bookId, quantity, db = pool) {
    const query = `INSERT INTO CartItems (cart_id, book_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
    const values = [cartId, bookId, quantity];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error adding item to cart ${cartId}:`, error);
      throw new Error("Could not add item to cart due to a database error.");
    }
  }

  static async removeItem(cartId, bookId, db = pool) {
    const query = `DELETE FROM CartItems WHERE cart_id=$1 AND book_id=$2 RETURNING *`;
    const values = [cartId, bookId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error removing item from cart ${cartId}:`, error);
      throw new Error(
        "Could not remove item from cart due to a database error.",
      );
    }
  }
}

export default CartModel;
