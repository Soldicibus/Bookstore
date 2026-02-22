import GenreModel from "./genre.model.js";
import pool from "../../db.js";

class GenreService {
	static async getAllGenres(db = pool) {
		try {
			const genres = await GenreModel.findAll(db);
			return { genres };
		} catch (error) {
			console.error("Service Error in getAllGenres:", error.message);
			throw error;
		}
	}

	static async getGenreById(id, db = pool) {
		try {
			const genre = await GenreModel.findById(id, db);
			if (!genre) throw new Error(`Genre with ID ${id} not found`);
			return { genre };
		} catch (error) {
			console.error("Service Error in getGenreById:", error.message);
			throw error;
		}
	}

	static async createGenre(name, db = pool) {
		try {
			const genre = await GenreModel.create(name, db);
			return { genre, message: "Genre created successfully" };
		} catch (error) {
			console.error("Service Error in createGenre:", error.message);
			throw error;
		}
	}

	static async updateGenre(id, name, db = pool) {
		try {
			const genre = await GenreModel.update(id, name, db);
			return { genre, message: "Genre updated successfully" };
		} catch (error) {
			console.error("Service Error in updateGenre:", error.message);
			throw error;
		}
	}

	static async deleteGenre(id, db = pool) {
		try {
			const genre = await GenreModel.delete(id, db);
			return { genre, message: `Genre ${id} deleted successfully` };
		} catch (error) {
			console.error("Service Error in deleteGenre:", error.message);
			throw error;
		}
	}
}

export default GenreService;
