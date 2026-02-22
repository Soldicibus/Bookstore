import ReviewService from "./review.service.js";

class ReviewController {
  static async getAllReviews(req, res, next) {
    try {
      const result = await ReviewService.getAllReviews();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async getReviewById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Review ID is required" });
      const result = await ReviewService.getReviewById(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async createReview(req, res, next) {
    try {
      const { title, description, rating, user_id, book_id } = req.body;
      if (!title || !rating || !user_id || !book_id) return res.status(400).json({ error: "title, rating, user_id and book_id are required" });
      const result = await ReviewService.createReview(title, description, rating, user_id, book_id);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async updateReview(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, rating, user_id, book_id } = req.body;
      if (!id || !title || !rating) return res.status(400).json({ error: "id, title and rating are required" });
      const result = await ReviewService.updateReview(id, title, description, rating, user_id, book_id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteReview(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Review ID is required" });
      const result = await ReviewService.deleteReview(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default ReviewController;
