import OrderModel from "./order.model.js";
import pool from "../../db.js";

class OrderService {
	static async getAllOrders(db = pool) {
		try {
			const orders = await OrderModel.findAll(db);
			return { orders };
		} catch (error) {
			console.error("Service Error in getAllOrders:", error.message);
			throw error;
		}
	}

	static async getOrderById(id, db = pool) {
		try {
			const order = await OrderModel.findById(id, db);
			if (!order) throw new Error(`Order with ID ${id} not found`);
			return { order };
		} catch (error) {
			console.error("Service Error in getOrderById:", error.message);
			throw error;
		}
	}

	static async createOrder(data, db = pool) {
		try {
			const { delivery_address, order_status, user_id, payment_status, total_cost } = data;
			const order = await OrderModel.create(delivery_address, order_status, user_id, payment_status, total_cost, db);
			return { order, message: "Order created successfully" };
		} catch (error) {
			console.error("Service Error in createOrder:", error.message);
			throw error;
		}
	}

	static async updateOrder(id, data, db = pool) {
		try {
			const { delivery_address, order_status, user_id, payment_status, total_cost } = data;
			const order = await OrderModel.update(id, delivery_address, order_status, user_id, payment_status, total_cost, db);
			return { order, message: "Order updated successfully" };
		} catch (error) {
			console.error("Service Error in updateOrder:", error.message);
			throw error;
		}
	}

	static async deleteOrder(id, db = pool) {
		try {
			const order = await OrderModel.delete(id, db);
			return { order, message: `Order ${id} deleted successfully` };
		} catch (error) {
			console.error("Service Error in deleteOrder:", error.message);
			throw error;
		}
	}

	static async addBookToOrder(orderId, bookId, quantity, db = pool) {
		try {
			await OrderModel.addBookToOrder(orderId, bookId, quantity, db);
			return { message: "Book added to order" };
		} catch (error) {
			console.error("Service Error in addBookToOrder:", error.message);
			throw error;
		}
	}

	static async removeBookFromOrder(orderId, bookId, db = pool) {
		try {
			await OrderModel.removeBookFromOrder(orderId, bookId, db);
			return { message: "Book removed from order" };
		} catch (error) {
			console.error("Service Error in removeBookFromOrder:", error.message);
			throw error;
		}
	}
}

export default OrderService;
