import pool from "../../db.js";

class BookModel {
  static async findAll(db = pool) {
    const query = `SELECT * FROM books`;

    try {
      const result = await db.query(query);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding books`, error);
      throw new Error("Could not retrieve books data due to a database error.");
    }
  }

  static async findById(id, db = pool) {
    const query = `SELECT * FROM books WHERE id=$1`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error finding book ${id}:`, error);
      throw new Error("Could not retrieve book data due to a database error.");
    }
  }

  static async create(title, description, language, isbn, publication_year, publisher_id, quantity, price, sale_status, page_amount, db = pool) {
    const query = `INSERT INTO books (title, description, language, isbn, publication_year, publisher_id, quantity, price, sale_status, page_amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    const values = [title, description, language, isbn, publication_year, publisher_id, quantity, price, sale_status, page_amount];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error creating book:`, error);
      throw new Error("Could not create book due to a database error.");
    }
  }

  static async update(id, title, description, language, isbn, publication_year, publisher_id, quantity, price, sale_status, page_amount, db = pool) {
    const query = `UPDATE books SET title=$1, description=$2, language=$3, isbn=$4, publication_year=$5, publisher_id=$6, quantity=$7, price=$8, sale_status=$9, page_amount=$10 WHERE id=$11 RETURNING *`;
    const values = [title, description, language, isbn, publication_year, publisher_id, quantity, price, sale_status, page_amount, id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error updating book ${id}:`, error);
      throw new Error("Could not update book due to a database error.");
    }
  }

  static async delete(id, db = pool) {
    const query = `DELETE FROM books WHERE id=$1 RETURNING *`;
    const values = [id];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error deleting book ${id}:`, error);
      throw new Error("Could not delete book due to a database error.");
    }
  }

  static async addAuthor(bookId, authorId, db = pool) {
    const query = `INSERT INTO BookAuthors (id, author_id) VALUES ($1, $2) RETURNING *`;
    const values = [bookId, authorId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error adding author ${authorId} to book ${bookId}:`, error);
      throw new Error("Could not add author to book due to a database error.");
    }
  }

  static async removeAuthor(bookId, authorId, db = pool) {
    const query = `DELETE FROM BookAuthors WHERE id=$1 AND author_id=$2 RETURNING *`;
    const values = [bookId, authorId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error removing author ${authorId} from book ${bookId}:`, error);
      throw new Error("Could not remove author from book due to a database error.");
    }
  }

  static async addGenre(bookId, genreId, db = pool) {
    const query = `INSERT INTO BookGenres (id, genre_id) VALUES ($1, $2) RETURNING *`;
    const values = [bookId, genreId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error adding genre ${genreId} to book ${bookId}:`, error);
      throw new Error("Could not add genre to book due to a database error.");
    }
  }

  static async removeGenre(bookId, genreId, db = pool) {
    const query = `DELETE FROM BookGenres WHERE id=$1 AND genre_id=$2 RETURNING *`;
    const values = [bookId, genreId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error removing genre ${genreId} from book ${bookId}:`, error);
      throw new Error("Could not remove genre from book due to a database error.");
    }
  }

  static async addThematic(bookId, thematicId, db = pool) {
    const query = `INSERT INTO BookThematics (id, theme_id) VALUES ($1, $2) RETURNING *`;
    const values = [bookId, thematicId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error adding thematic ${thematicId} to book ${bookId}:`, error);
      throw new Error("Could not add thematic to book due to a database error.");
    }
  }

  static async removeThematic(bookId, thematicId, db = pool) {
    const query = `DELETE FROM BookThematics WHERE id=$1 AND theme_id=$2 RETURNING *`;
    const values = [bookId, thematicId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error removing thematic ${thematicId} from book ${bookId}:`, error);
      throw new Error("Could not remove thematic from book due to a database error.");
    }
  }

  static async findByGenre(genreId, db = pool) {
    const query = `
      SELECT DISTINCT b.* FROM books b
      INNER JOIN BookGenres bg ON b.id = bg.book_id
      WHERE bg.genre_id = $1
    `;
    const values = [genreId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding books by genre ${genreId}:`, error);
      throw new Error("Could not retrieve books by genre due to a database error.");
    }
  }

  static async findByAuthor(authorId, db = pool) {
    const query = `
      SELECT DISTINCT b.* FROM books b
      INNER JOIN BookAuthors ba ON b.id = ba.book_id
      WHERE ba.author_id = $1
    `;
    const values = [authorId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding books by author ${authorId}:`, error);
      throw new Error("Could not retrieve books by author due to a database error.");
    }
  }

  static async findByThematic(thematicId, db = pool) {
    const query = `
      SELECT DISTINCT b.* FROM books b
      INNER JOIN BookThematics bt ON b.id = bt.book_id
      WHERE bt.theme_id = $1
    `;
    const values = [thematicId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding books by thematic ${thematicId}:`, error);
      throw new Error("Could not retrieve books by thematic due to a database error.");
    }
  }

  static async findAuthorsByBook(bookId, db = pool) {
    const query = `
      SELECT DISTINCT a.* FROM authors a
      INNER JOIN BookAuthors ba ON a.id = ba.author_id
      WHERE ba.book_id = $1
    `;
    const values = [bookId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding authors for book ${bookId}:`, error);
      throw new Error("Could not retrieve authors for book due to a database error.");
    }
  }

  static async addToFavorites(userId, bookId, db = pool) {
    const query = `INSERT INTO Favorites (user_id, book_id) VALUES ($1, $2) RETURNING *`;
    const values = [userId, bookId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error adding book ${bookId} to favorites for user ${userId}:`, error);
      throw new Error("Could not add book to favorites due to a database error.");
    }
  }

  static async removeFromFavorites(userId, bookId, db = pool) {
    const query = `DELETE FROM Favorites WHERE user_id=$1 AND book_id=$2 RETURNING *`;
    const values = [userId, bookId];

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Database error removing book ${bookId} from favorites for user ${userId}:`, error);
      throw new Error("Could not remove book from favorites due to a database error.");
    }
  }

  static async findFavoritesByUser(userId, db = pool) {
    const query = `
      SELECT f.* FROM Favorites f WHERE f.user_id = $1
    `;
    const values = [userId];
    console.log(`Finding favorite books for user ${userId} with query:`, query, "and values:", values);

    try {
      const result = await db.query(query, values);
      return result.rows && result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error(`Database error finding favorite books for user ${userId}:`, error);
      throw new Error("Could not retrieve favorite books due to a database error.");
    }
  }
}

export default BookModel;
