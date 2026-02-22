import pool from "../../db.js";

class OrderModel {
  static async findAll(db = pool) {
    const query = `SELECT * FROM orders`;
    try {
      const result = await db.query(query);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding orders`, error);
      throw new Error(
        "Could not retrieve orders data due to a database error.",
      );
    }
  }

  static async findById(id, db = pool) {
    const query = `SELECT * FROM orders WHERE id=$1`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error finding order ${id}:`, error);
      throw new Error("Could not retrieve order data due to a database error.");
    }
  }

  static async create(
    delivery_address,
    order_status,
    user_id,
    payment_status,
    total_cost,
    db = pool,
  ) {
    const query = `INSERT INTO orders (delivery_address, order_status, user_id, payment_status, total_cost) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [
      delivery_address,
      order_status,
      user_id,
      payment_status,
      total_cost,
    ];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error creating order:`, error);
      throw new Error("Could not create order due to a database error.");
    }
  }

  static async delete(id, db = pool) {
    const query = `DELETE FROM orders WHERE id=$1 RETURNING *`;
    const values = [id];
    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error deleting order ${id}:`, error);
      throw new Error("Could not delete order due to a database error.");
    }
  }

  static async update(
    id,
    delivery_address,
    order_status,
    user_id,
    payment_status,
    total_cost,
    db = pool,
  ) {
    const query = `UPDATE orders SET delivery_address=$1, order_status=$2, user_id=$3, payment_status=$4, total_cost=$5 WHERE id=$6 RETURNING *`;
    const values = [
      delivery_address,
      order_status,
      user_id,
      payment_status,
      total_cost,
      id,
    ];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error updating order ${id}:`, error);
      throw new Error("Could not update order due to a database error.");
    }
  }

  static async addBookToOrder(order_id, book_id, quantity, db = pool) {
    const query = `INSERT INTO OrderBooks (order_id, book_id, quantity) VALUES ($1, $2, $3)`;
    const values = [order_id, book_id, quantity];

    try {
      await db.query(query, values);
    } catch (error) {
      console.error(`Database error adding book to order ${order_id}:`, error);
      throw new Error("Could not add book to order due to a database error.");
    }
  }

  static async removeBookFromOrder(order_id, book_id, db = pool) {
    const query = `DELETE FROM OrderBooks WHERE order_id=$1 AND book_id=$2`;
    const values = [order_id, book_id];

    try {
      await db.query(query, values);
    } catch (error) {
      console.error(`Database error removing book from order ${order_id}:`, error);
      throw new Error("Could not remove book from order due to a database error.");
    }
  }
}

export default OrderModel;
