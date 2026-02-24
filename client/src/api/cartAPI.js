import api from "./lib/api.js";

export const getAllCarts = async () => {
	const res = await api.get("/carts");
	return res.data.carts || res.data;
};

export const getCartById = async (id) => {
	const res = await api.get(`/carts/${id}`);
	return res.data;
};

export const createCart = async (userId) => {
	const res = await api.post(`/carts`, { userId });
	return res.data;
};

export const deleteCart = async (id) => {
	const res = await api.delete(`/carts/${id}`);
	return res.data;
};

export const addItemToCart = async (cartId, bookId, quantity) => {
	const res = await api.post(`/carts/${cartId}/add-item`, { bookId, quantity });
	return res.data;
};

export const removeItemFromCart = async (cartId, bookId) => {
	const res = await api.post(`/carts/${cartId}/remove-item`, { bookId });
	return res.data;
};