import ThemeModel from "./theme.model.js";
import pool from "../../db.js";

class ThemeService {
  static async getAllThemes(db = pool) {
    try {
      const themes = await ThemeModel.findAll(db);
      return { themes };
    } catch (error) {
      console.error("Service Error in getAllThemes:", error.message);
      throw error;
    }
  }

  static async getThemeById(themeId, db = pool) {
    try {
      const theme = await ThemeModel.findById(themeId, db);
      if (!theme) {
        throw new Error(`Theme with ID ${themeId} not found`);
      }
      return { theme };
    } catch (error) {
      console.error("Service Error in getThemeById:", error.message);
      throw error;
    }
  }

  static async createTheme(name, description, db = pool) {
    try {
      const themeId = await ThemeModel.create(name, description, db);
      return { themeId, message: "Theme created successfully" };
    } catch (error) {
      console.error("Service Error in createTheme:", error.message);
      throw error;
    }
  }

  static async updateTheme(themeId, name, description, db = pool) {
    try {
      await ThemeModel.update(themeId, name, description, db);
      return { message: "Theme updated successfully" };
    } catch (error) {
      console.error("Service Error in updateTheme:", error.message);
      throw error;
    }
  }

  static async deleteTheme(themeId, db = pool) {
    try {
      await ThemeModel.delete(themeId, db);
      return { message: `Theme ${themeId} deleted successfully` };
    } catch (error) {
      console.error("Service Error in deleteTheme:", error.message);
      throw error;
    }
  }
}

export default ThemeService;
