import { Router } from "express";
import PublisherController from "./publisher.controller.js";

const router = Router();

router.get("/", PublisherController.getAllPublishers);
router.get("/:id", PublisherController.getPublisherById);
router.post("/", PublisherController.createPublisher);
router.patch("/:id", PublisherController.updatePublisher);
router.delete("/:id", PublisherController.deletePublisher);

export default router;
