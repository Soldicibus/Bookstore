import CartService from "./cart.service.js";

class CartController {
  static async getAllCarts(req, res, next) {
    try {
      const result = await CartService.getAllCarts();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async getCartById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Cart ID is required" });
      const result = await CartService.getCartById(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async createCart(req, res, next) {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ error: "userId is required" });
      const result = await CartService.createCart(userId);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Cart ID is required" });
      const result = await CartService.deleteCart(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async addItem(req, res, next) {
    try {
      const { id } = req.params; // cart id
      const { bookId, quantity } = req.body;
      if (!id || !bookId || !quantity) return res.status(400).json({ error: "cart id, bookId and quantity are required" });
      const result = await CartService.addItem(id, bookId, quantity);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async removeItem(req, res, next) {
    try {
      const { id } = req.params; // cart id
      const { bookId } = req.body;
      if (!id || !bookId) return res.status(400).json({ error: "cart id and bookId are required" });
      const result = await CartService.removeItem(id, bookId);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default CartController;
