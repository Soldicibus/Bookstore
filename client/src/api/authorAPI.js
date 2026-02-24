import api from "./lib/api.js";

export const getAllAuthors = async () => {
	const res = await api.get("/authors");
	return res.data.authors || res.data;
};

export const getAuthorById = async (id) => {
	const res = await api.get(`/authors/${id}`);
	return res.data;
};

export const createAuthor = async (payload) => {
	const res = await api.post("/authors", payload);
	return res.data;
};

export const updateAuthor = async (id, payload) => {
	const res = await api.patch(`/authors/${id}`, payload);
	return res.data;
};

export const deleteAuthor = async (id) => {
	const res = await api.delete(`/authors/${id}`);
	return res.data;
};