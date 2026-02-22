import { Router } from "express";
import GenreController from "./genre.controller.js";

const router = Router();

router.get("/", GenreController.getAllGenres);
router.get("/:id", GenreController.getGenreById);
router.post("/", GenreController.createGenre);
router.patch("/:id", GenreController.updateGenre);
router.delete("/:id", GenreController.deleteGenre);

export default router;
