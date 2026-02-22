import GenreService from "./genre.service.js";

class GenreController {
  static async getAllGenres(req, res, next) {
    try {
      const result = await GenreService.getAllGenres();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async getGenreById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Genre ID is required" });
      const result = await GenreService.getGenreById(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async createGenre(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: "name is required" });
      const result = await GenreService.createGenre(name);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async updateGenre(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!id || !name) return res.status(400).json({ error: "id and name are required" });
      const result = await GenreService.updateGenre(id, name);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteGenre(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Genre ID is required" });
      const result = await GenreService.deleteGenre(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default GenreController;
