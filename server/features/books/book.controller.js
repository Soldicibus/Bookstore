import BookService from "./book.service.js";

class BookController {
  static async getAllBooks(req, res, next) {
    try {
      const result = await BookService.getAllBooks();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async getBookById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Book ID is required" });
      const result = await BookService.getBookById(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async createBook(req, res, next) {
    try {
      const data = req.body;
      if (!data || !data.title) return res.status(400).json({ error: "title is required" });
      const result = await BookService.createBook(data);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async updateBook(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || !data) return res.status(400).json({ error: "id and update data are required" });
      const result = await BookService.updateBook(id, data);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Book ID is required" });
      const result = await BookService.deleteBook(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async addAuthor(req, res, next) {
    try {
      const { id } = req.params; // book id
      const { authorId } = req.body;
      if (!id || !authorId) return res.status(400).json({ error: "book id and authorId are required" });
      const result = await BookService.addAuthorToBook(id, authorId);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async removeAuthor(req, res, next) {
    try {
      const { id } = req.params; // book id
      const { authorId } = req.body;
      if (!id || !authorId) return res.status(400).json({ error: "book id and authorId are required" });
      const result = await BookService.removeAuthorFromBook(id, authorId);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  // Similar endpoints for genres and thematics can be used
  static async addGenre(req, res, next) {
    try {
      const { id } = req.params;
      const { genreId } = req.body;
      if (!id || !genreId) return res.status(400).json({ error: "book id and genreId are required" });
      const result = await BookService.addGenreToBook(id, genreId);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async removeGenre(req, res, next) {
    try {
      const { id } = req.params;
      const { genreId } = req.body;
      if (!id || !genreId) return res.status(400).json({ error: "book id and genreId are required" });
      const result = await BookService.removeGenreFromBook(id, genreId);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async addThematic(req, res, next) {
    try {
      const { id } = req.params;
      const { thematicId } = req.body;
      if (!id || !thematicId) return res.status(400).json({ error: "book id and thematicId are required" });
      const result = await BookService.addThematicToBook(id, thematicId);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async removeThematic(req, res, next) {
    try {
      const { id } = req.params;
      const { thematicId } = req.body;
      if (!id || !thematicId) return res.status(400).json({ error: "book id and thematicId are required" });
      const result = await BookService.removeThematicFromBook(id, thematicId);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default BookController;
