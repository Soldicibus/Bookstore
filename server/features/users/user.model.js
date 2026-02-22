import pool from "../../db.js";

class UserModel {
  static async findAll(db = pool) {
    const query = `SELECT * FROM users`;

    try {
      const result = await db.query(query);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding users`, error);
      throw new Error("Could not retrieve users data due to a database error.");
    }
  }
  static async findById(id, db = pool) {
    const query = `SELECT * FROM users WHERE id=$1`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error finding user ${id}:`, error);
      throw new Error("Could not retrieve user data due to a database error.");
    }
  }

  static async create(username, email, password, role, db = pool) {
    const query = `CALL proc_register_user($1::character varying, $2::character varying, $3::character varying, $4::integer, NULL::integer)`;
    const values = [username, email, password, role];
    try {
      const result = await db.query(query, values);
      return result.rows[0]?.new_user_id;
    } catch (error) {
      console.error(
        `Database error creating user ${username}\t ${email}\t ${password}\t:`,
        error,
      );
      if (error.code === "23505") {
        throw new Error(`Username or email '${username}' already exists.`);
      }
      if (error.code === "23514") {
        throw new Error(`Username, email, or password cannot be empty.`);
      }
      throw new Error("Could not create a user data due to a database error.");
    }
  }
  static async update(id, username, email, password, db = pool) {
    const query = `CALL proc_update_user($1::integer, $2::character varying, $3::character varying, $4::character varying)`;
    const values = [id, username, email, password];

    try {
      await db.query(query, values);
    } catch (error) {
      console.error(
        `Database error updating the user ${id}\t ${username}\t ${email}\t ${password}\t:`,
        error,
      );
      if (error.code === "P0002") {
        throw new Error(`User with ID ${id} does not exist.`);
      }
      if (error.code === "23505") {
        throw new Error(`Username or email already exists.`);
      }
      throw new Error(
        "Could not update the user data due to a database error.",
      );
    }
  }
  static async delete(id, db = pool) {
    const query = `CALL proc_delete_user($1::integer)`;
    const values = [id];

    try {
      await db.query(query, values);
    } catch (error) {
      console.error(`Database error deleting the user ${id}\t:`, error);
      if (error.code === "22003") {
        throw new Error(`User with ID ${id} does not exist.`);
      }
      throw new Error(
        "Could not delete the user data due to a database error.",
      );
    }
  }

  static async reset_password(user_id, p_new_password, db = pool) {
    const query = `CALL proc_reset_user_password($1::integer, $2::character varying)`;
    const values = [user_id, p_new_password];
    try {
      await db.query(query, values);
    } catch (error) {
      console.error(`Database error changing password:`, error);
      if (error.code === "22003") {
        throw new Error(`User with ID ${user_id} does not exist.`);
      }
      if (error.code === "23514") {
        throw new Error(`Password cannot be empty.`);
      }
      throw new Error("Could not change password due to a database error.");
    }
  }

  static async assign_role(user_id, role_id, db = pool) {
    const query = `CALL proc_assign_role_to_user($1::integer, $2::integer)`;
    const values = [user_id, role_id];

    try {
      await db.query(query, values);
    } catch (error) {
      console.error(`Database error assigning role to user ${user_id}:`, error);
      if (error.code === "22003") {
        throw new Error(`User with ID ${user_id} does not exist.`);
      }
      if (error.code === "23514") {
        throw new Error(`Role ID cannot be empty.`);
      }
      throw new Error("Could not assign role to user due to a database error.");
    }
  }

  static async addFavoriteBook(user_id, book_id, db = pool) {
    const query = `INSERT INTO Favorites (user_id, book_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`;
    const values = [user_id, book_id];

    try {
      await db.query(query, values);
    } catch (error) {
      console.error(
        `Database error adding favorite book for user ${user_id}:`,
        error,
      );
      throw new Error("Could not add favorite book due to a database error.");
    }
  }
}

export default UserModel;
