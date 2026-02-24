import api from "./lib/api.js";

export const getAllOrders = async () => {
	const res = await api.get("/orders");
	return res.data.orders || res.data;
};

export const getOrderById = async (id) => {
	const res = await api.get(`/orders/${id}`);
	return res.data;
};

export const createOrder = async (payload) => {
	const res = await api.post(`/orders`, payload);
	return res.data;
};

export const updateOrder = async (id, payload) => {
	const res = await api.patch(`/orders/${id}`, payload);
	return res.data;
};

export const deleteOrder = async (id) => {
	const res = await api.delete(`/orders/${id}`);
	return res.data;
};

export const addBookToOrder = async (orderId, bookId, quantity) => {
	const res = await api.post(`/orders/${orderId}/add-book`, { bookId, quantity });
	return res.data;
};

export const removeBookFromOrder = async (orderId, bookId) => {
	const res = await api.post(`/orders/${orderId}/remove-book`, { bookId });
	return res.data;
};