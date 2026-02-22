import { Router } from "express";
import UserController from "./user.controller.js";

const router = Router();

// Get all users
router.get("/", UserController.getAllUsers);

// Get user by ID
router.get("/:id", UserController.getUserById);

// Create a new user
router.post("/", UserController.createUser);

// Update user
router.patch("/:id", UserController.updateUser);

// Delete user
router.delete("/:id", UserController.deleteUser);

// Reset password
router.post("/reset-password", UserController.resetPassword);

// Assign role to user
router.post("/:id/assign-role", UserController.assignRole);

export default router;

