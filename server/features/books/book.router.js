import { Router } from "express";
import BookController from "./book.controller.js";

const router = Router();

router.get("/", BookController.getAllBooks);
router.get("/:id", BookController.getBookById);
router.post("/", BookController.createBook);
router.patch("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

// Relationship endpoints
router.post("/:id/add-author", BookController.addAuthor);
router.post("/:id/remove-author", BookController.removeAuthor);
router.post("/:id/add-genre", BookController.addGenre);
router.post("/:id/remove-genre", BookController.removeGenre);
router.post("/:id/add-thematic", BookController.addThematic);
router.post("/:id/remove-thematic", BookController.removeThematic);

export default router;
