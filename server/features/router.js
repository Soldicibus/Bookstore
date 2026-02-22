import { Router } from "express";
import userRouter from "./users/user.router.js";
import authRouter from "./auth/auth.route.js";
import authorRouter from "./authors/author.router.js";
import bookRouter from "./books/book.router.js";
import cartRouter from "./carts/cart.router.js";
import genreRouter from "./genres/genre.router.js";
import orderRouter from "./orders/order.router.js";
import publisherRouter from "./publishers/publisher.router.js";
import reviewRouter from "./reviews/review.router.js";
import themeRouter from "./themes/theme.router.js";

const router = Router();

// Public auth routes
router.use("/auth", authRouter);

// Feature routes
router.use("/users", userRouter);
router.use("/authors", authorRouter);
router.use("/books", bookRouter);
router.use("/carts", cartRouter);
router.use("/genres", genreRouter);
router.use("/orders", orderRouter);
router.use("/publishers", publisherRouter);
router.use("/reviews", reviewRouter);
router.use("/themes", themeRouter);

export default router;
