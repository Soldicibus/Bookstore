import { Router } from "express";
import CartController from "./cart.controller.js";

const router = Router();

router.get("/", CartController.getAllCarts);
router.get("/:id", CartController.getCartById);
router.post("/", CartController.createCart);
router.delete("/:id", CartController.deleteCart);

router.post("/:id/add-item", CartController.addItem);
router.post("/:id/remove-item", CartController.removeItem);

export default router;
