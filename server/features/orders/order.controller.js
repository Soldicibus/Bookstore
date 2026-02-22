import OrderService from "./order.service.js";

class OrderController {
  static async getAllOrders(req, res, next) {
    try {
      const result = await OrderService.getAllOrders();
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Order ID is required" });
      const result = await OrderService.getOrderById(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async createOrder(req, res, next) {
    try {
      const data = req.body;
      if (!data || !data.user_id) return res.status(400).json({ error: "user_id is required" });
      const result = await OrderService.createOrder(data);
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async updateOrder(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id || !data) return res.status(400).json({ error: "id and update data are required" });
      const result = await OrderService.updateOrder(id, data);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "Order ID is required" });
      const result = await OrderService.deleteOrder(id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async addBook(req, res, next) {
    try {
      const { id } = req.params; // order id
      const { bookId, quantity } = req.body;
      if (!id || !bookId || !quantity) return res.status(400).json({ error: "order id, bookId and quantity are required" });
      const result = await OrderService.addBookToOrder(id, bookId, quantity);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  static async removeBook(req, res, next) {
    try {
      const { id } = req.params; // order id
      const { bookId } = req.body;
      if (!id || !bookId) return res.status(400).json({ error: "order id and bookId are required" });
      const result = await OrderService.removeBookFromOrder(id, bookId);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default OrderController;
