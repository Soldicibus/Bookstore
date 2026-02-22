import CartModel from "./cart.model.js";
import pool from "../../db.js";

class CartService {
	static async getAllCarts(db = pool) {
		try {
			const carts = await CartModel.findAll(db);
			return { carts };
		} catch (error) {
			console.error("Service Error in getAllCarts:", error.message);
			throw error;
		}
	}

	static async getCartById(cartId, db = pool) {
		try {
			const cart = await CartModel.findById(cartId, db);
			if (!cart) throw new Error(`Cart with ID ${cartId} not found`);
			return { cart };
		} catch (error) {
			console.error("Service Error in getCartById:", error.message);
			throw error;
		}
	}

	static async createCart(userId, db = pool) {
		try {
			const cart = await CartModel.create(userId, db);
			return { cart, message: "Cart created successfully" };
		} catch (error) {
			console.error("Service Error in createCart:", error.message);
			throw error;
		}
	}

	static async deleteCart(id, db = pool) {
		try {
			const cart = await CartModel.delete(id, db);
			return { cart, message: `Cart ${id} deleted successfully` };
		} catch (error) {
			console.error("Service Error in deleteCart:", error.message);
			throw error;
		}
	}

	static async addItem(cartId, bookId, quantity, db = pool) {
		try {
			const item = await CartModel.addItem(cartId, bookId, quantity, db);
			return { item, message: "Item added to cart" };
		} catch (error) {
			console.error("Service Error in addItem:", error.message);
			throw error;
		}
	}

	static async removeItem(cartId, bookId, db = pool) {
		try {
			const item = await CartModel.removeItem(cartId, bookId, db);
			return { item, message: "Item removed from cart" };
		} catch (error) {
			console.error("Service Error in removeItem:", error.message);
			throw error;
		}
	}
}

export default CartService;
