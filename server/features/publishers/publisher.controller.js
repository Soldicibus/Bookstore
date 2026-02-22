import PublisherService from "./publisher.service.js";

class PublisherController {
  static async getAllPublishers(req, res, next) {
    try {
      const result = await PublisherService.getAllPublishers();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async getPublisherById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Publisher ID is required" });
      const result = await PublisherService.getPublisherById(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async createPublisher(req, res, next) {
    try {
      const { name, description } = req.body;
      if (!name) return res.status(400).json({ error: "name is required" });
      const result = await PublisherService.createPublisher(name, description);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async updatePublisher(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      if (!id || !name) return res.status(400).json({ error: "id and name are required" });
      const result = await PublisherService.updatePublisher(id, name, description);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async deletePublisher(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Publisher ID is required" });
      const result = await PublisherService.deletePublisher(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default PublisherController;
