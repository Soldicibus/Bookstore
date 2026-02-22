import { Router } from "express";
import AuthController from "./auth.controller.js";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/refresh", AuthController.refreshToken);
router.post("/switch-role", AuthController.switchRole);

export default router;
