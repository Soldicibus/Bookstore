import AuthorModel from "./author.model.js";
import pool from "../../db.js";

class AuthorService {
	static async getAllAuthors(db = pool) {
		try {
			const authors = await AuthorModel.findAll(db);
			return { authors };
		} catch (error) {
			console.error("Service Error in getAllAuthors:", error.message);
			throw error;
		}
	}

	static async getAuthorById(authorId, db = pool) {
		try {
			const author = await AuthorModel.findById(authorId, db);
			if (!author) throw new Error(`Author with ID ${authorId} not found`);
			return { author };
		} catch (error) {
			console.error("Service Error in getAuthorById:", error.message);
			throw error;
		}
	}

	static async createAuthor(name, surname, patronym, description, db = pool) {
		try {
			const author = await AuthorModel.create(name, surname, patronym, description, db);
			return { author, message: "Author created successfully" };
		} catch (error) {
			console.error("Service Error in createAuthor:", error.message);
			throw error;
		}
	}

	static async updateAuthor(id, name, surname, patronym, description, db = pool) {
		try {
			const author = await AuthorModel.update(id, name, surname, patronym, description, db);
			return { author, message: "Author updated successfully" };
		} catch (error) {
			console.error("Service Error in updateAuthor:", error.message);
			throw error;
		}
	}

	static async deleteAuthor(id, db = pool) {
		try {
			const author = await AuthorModel.delete(id, db);
			return { author, message: `Author ${id} deleted successfully` };
		} catch (error) {
			console.error("Service Error in deleteAuthor:", error.message);
			throw error;
		}
	}
}

export default AuthorService;
