import { Router } from "express";
import OrderController from "./order.controller.js";

const router = Router();

router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getOrderById);
router.post("/", OrderController.createOrder);
router.patch("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

router.post("/:id/add-book", OrderController.addBook);
router.post("/:id/remove-book", OrderController.removeBook);

export default router;
