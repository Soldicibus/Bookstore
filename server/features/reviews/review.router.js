import { Router } from "express";
import ReviewController from "./review.controller.js";

const router = Router();

router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getReviewById);
router.post("/", ReviewController.createReview);
router.patch("/:id", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);

export default router;
