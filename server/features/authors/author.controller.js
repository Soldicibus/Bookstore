import AuthorService from "./author.service.js";

class AuthorController {
  static async getAllAuthors(req, res, next) {
    try {
      const result = await AuthorService.getAllAuthors();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async getAuthorById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Author ID is required" });
      const result = await AuthorService.getAuthorById(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async createAuthor(req, res, next) {
    try {
      const { name, surname, patronym, description } = req.body;
      if (!name || !surname) return res.status(400).json({ error: "name and surname are required" });
      const result = await AuthorService.createAuthor(name, surname, patronym, description);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async updateAuthor(req, res, next) {
    try {
      const { id } = req.params;
      const { name, surname, patronym, description } = req.body;
      if (!id || !name || !surname) return res.status(400).json({ error: "id, name and surname are required" });
      const result = await AuthorService.updateAuthor(id, name, surname, patronym, description);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Author ID is required" });
      const result = await AuthorService.deleteAuthor(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default AuthorController;
