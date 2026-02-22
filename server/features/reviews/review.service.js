import ReviewModel from "./review.model.js";
import pool from "../../db.js";

class ReviewService {
	static async getAllReviews(db = pool) {
		try {
			const reviews = await ReviewModel.findAll(db);
			return { reviews };
		} catch (error) {
			console.error("Service Error in getAllReviews:", error.message);
			throw error;
		}
	}

	static async getReviewById(id, db = pool) {
		try {
			const review = await ReviewModel.findById(id, db);
			if (!review) throw new Error(`Review with ID ${id} not found`);
			return { review };
		} catch (error) {
			console.error("Service Error in getReviewById:", error.message);
			throw error;
		}
	}

	static async createReview(title, description, rating, user_id, book_id, db = pool) {
		try {
			const review = await ReviewModel.create(title, description, rating, user_id, book_id, db);
			return { review, message: "Review created successfully" };
		} catch (error) {
			console.error("Service Error in createReview:", error.message);
			throw error;
		}
	}

	static async updateReview(id, title, description, rating, user_id, book_id, db = pool) {
		try {
			const review = await ReviewModel.update(id, title, description, rating, user_id, book_id, db);
			return { review, message: "Review updated successfully" };
		} catch (error) {
			console.error("Service Error in updateReview:", error.message);
			throw error;
		}
	}

	static async deleteReview(id, db = pool) {
		try {
			const review = await ReviewModel.delete(id, db);
			return { review, message: `Review ${id} deleted successfully` };
		} catch (error) {
			console.error("Service Error in deleteReview:", error.message);
			throw error;
		}
	}
}

export default ReviewService;
