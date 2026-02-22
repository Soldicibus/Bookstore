import { Router } from "express";
import AuthorController from "./author.controller.js";

const router = Router();

router.get("/", AuthorController.getAllAuthors);
router.get("/:id", AuthorController.getAuthorById);
router.post("/", AuthorController.createAuthor);
router.patch("/:id", AuthorController.updateAuthor);
router.delete("/:id", AuthorController.deleteAuthor);

export default router;
