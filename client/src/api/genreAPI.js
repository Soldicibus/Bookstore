import api from "./lib/api.js";

export const getAllGenres = async () => {
	const res = await api.get("/genres");
	return res.data.genres || res.data;
};

export const getGenreById = async (id) => {
	const res = await api.get(`/genres/${id}`);
	return res.data;
};

export const createGenre = async (payload) => {
	const res = await api.post(`/genres`, payload);
	return res.data;
};

export const updateGenre = async (id, payload) => {
	const res = await api.patch(`/genres/${id}`, payload);
	return res.data;
};

export const deleteGenre = async (id) => {
	const res = await api.delete(`/genres/${id}`);
	return res.data;
};