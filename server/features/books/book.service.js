import BookModel from "./book.model.js";
import pool from "../../db.js";

class BookService {
	static async getAllBooks(db = pool) {
		try {
			const books = await BookModel.findAll(db);
			return { books };
		} catch (error) {
			console.error("Service Error in getAllBooks:", error.message);
			throw error;
		}
	}

	static async getBookById(bookId, db = pool) {
		try {
			const book = await BookModel.findById(bookId, db);
			if (!book) throw new Error(`Book with ID ${bookId} not found`);
			return { book };
		} catch (error) {
			console.error("Service Error in getBookById:", error.message);
			throw error;
		}
	}

	static async createBook(data, db = pool) {
		try {
			const {
				title,
				description,
				language,
				isbn,
				publication_year,
				publisher_id,
				quantity,
				price,
				sale_status,
				page_amount,
			} = data;

			const book = await BookModel.create(
				title,
				description,
				language,
				isbn,
				publication_year,
				publisher_id,
				quantity,
				price,
				sale_status,
				page_amount,
				db,
			);
			return { book, message: "Book created successfully" };
		} catch (error) {
			console.error("Service Error in createBook:", error.message);
			throw error;
		}
	}

	static async updateBook(id, data, db = pool) {
		try {
			const {
				title,
				description,
				language,
				isbn,
				publication_year,
				publisher_id,
				quantity,
				price,
				sale_status,
				page_amount,
			} = data;

			const book = await BookModel.update(
				id,
				title,
				description,
				language,
				isbn,
				publication_year,
				publisher_id,
				quantity,
				price,
				sale_status,
				page_amount,
				db,
			);

			return { book, message: "Book updated successfully" };
		} catch (error) {
			console.error("Service Error in updateBook:", error.message);
			throw error;
		}
	}

	static async deleteBook(id, db = pool) {
		try {
			const book = await BookModel.delete(id, db);
			return { book, message: `Book ${id} deleted successfully` };
		} catch (error) {
			console.error("Service Error in deleteBook:", error.message);
			throw error;
		}
	}

	static async addAuthorToBook(bookId, authorId, db = pool) {
		try {
			const res = await BookModel.addAuthor(bookId, authorId, db);
			return { res, message: "Author added to book" };
		} catch (error) {
			console.error("Service Error in addAuthorToBook:", error.message);
			throw error;
		}
	}

	static async removeAuthorFromBook(bookId, authorId, db = pool) {
		try {
			const res = await BookModel.removeAuthor(bookId, authorId, db);
			return { res, message: "Author removed from book" };
		} catch (error) {
			console.error("Service Error in removeAuthorFromBook:", error.message);
			throw error;
		}
	}

	static async addGenreToBook(bookId, genreId, db = pool) {
		try {
			const res = await BookModel.addGenre(bookId, genreId, db);
			return { res, message: "Genre added to book" };
		} catch (error) {
			console.error("Service Error in addGenreToBook:", error.message);
			throw error;
		}
	}

	static async removeGenreFromBook(bookId, genreId, db = pool) {
		try {
			const res = await BookModel.removeGenre(bookId, genreId, db);
			return { res, message: "Genre removed from book" };
		} catch (error) {
			console.error("Service Error in removeGenreFromBook:", error.message);
			throw error;
		}
	}

	static async addThematicToBook(bookId, thematicId, db = pool) {
		try {
			const res = await BookModel.addThematic(bookId, thematicId, db);
			return { res, message: "Thematic added to book" };
		} catch (error) {
			console.error("Service Error in addThematicToBook:", error.message);
			throw error;
		}
	}

	static async removeThematicFromBook(bookId, thematicId, db = pool) {
		try {
			const res = await BookModel.removeThematic(bookId, thematicId, db);
			return { res, message: "Thematic removed from book" };
		} catch (error) {
			console.error("Service Error in removeThematicFromBook:", error.message);
			throw error;
		}
	}
}

export default BookService;
