import api from "./lib/api.js";

export const getAllPublishers = async () => {
	const res = await api.get("/publishers");
	return res.data.publishers || res.data;
};

export const getPublisherById = async (id) => {
	const res = await api.get(`/publishers/${id}`);
	return res.data;
};

export const createPublisher = async (payload) => {
	const res = await api.post(`/publishers`, payload);
	return res.data;
};

export const updatePublisher = async (id, payload) => {
	const res = await api.patch(`/publishers/${id}`, payload);
	return res.data;
};

export const deletePublisher = async (id) => {
	const res = await api.delete(`/publishers/${id}`);
	return res.data;
};