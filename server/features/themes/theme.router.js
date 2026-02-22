import { Router } from "express";
import ThemeController from "./theme.controller.js";

const router = Router();

router.get("/", ThemeController.getAllThemes);
router.get("/:id", ThemeController.getThemeById);
router.post("/", ThemeController.createTheme);
router.patch("/:id", ThemeController.updateTheme);
router.delete("/:id", ThemeController.deleteTheme);

export default router;
