import ThemeService from "./theme.service.js";

class ThemeController {
  static async getAllThemes(req, res, next) {
    try {
      const result = await ThemeService.getAllThemes();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async getThemeById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Theme ID is required" });
      const result = await ThemeService.getThemeById(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async createTheme(req, res, next) {
    try {
      const { name, description } = req.body;
      if (!name) return res.status(400).json({ error: "name is required" });
      const result = await ThemeService.createTheme(name, description);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async updateTheme(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      if (!id || !name) return res.status(400).json({ error: "id and name are required" });
      const result = await ThemeService.updateTheme(id, name, description);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteTheme(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Theme ID is required" });
      const result = await ThemeService.deleteTheme(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default ThemeController;
