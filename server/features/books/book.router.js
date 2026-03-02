import { Router } from "express";
import BookController from "./book.controller.js";

const router = Router();

router.get("/", BookController.getAllBooks);
router.get("/genre/:genreId", BookController.getBooksByGenre);
router.get("/author/:authorId", BookController.getBooksByAuthor);
router.get("/thematic/:thematicId", BookController.getBooksByThematic);
router.get("/:bookId/authors", BookController.getAuthorsByBook);
router.get("/:id", BookController.getBookById);
router.get("/favorite/:userId", BookController.getFavoriteBooks);
router.post("/", BookController.createBook);
router.patch("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

// Relationship endpoints
router.post("/:id/add-author", BookController.addAuthor);
router.delete("/:id/remove-author", BookController.removeAuthor);
router.post("/:id/add-genre", BookController.addGenre);
router.delete("/:id/remove-genre", BookController.removeGenre);
router.post("/:id/add-thematic", BookController.addThematic);
router.delete("/:id/remove-thematic", BookController.removeThematic);
router.post("/favorite/:id/:userId", BookController.addToFavorites);
router.delete("/favorite/:id/:userId", BookController.removeFromFavorites);

export default router;
