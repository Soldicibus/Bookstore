import api from "./lib/api.js";

export const getAllReviews = async () => {
	const res = await api.get("/reviews");
	return res.data.reviews || res.data;
};

export const getReviewById = async (id) => {
	const res = await api.get(`/reviews/${id}`);
	return res.data;
};

export const createReview = async (payload) => {
	const res = await api.post(`/reviews`, payload);
	return res.data;
};

export const updateReview = async (id, payload) => {
	const res = await api.patch(`/reviews/${id}`, payload);
	return res.data;
};

export const deleteReview = async (id) => {
	const res = await api.delete(`/reviews/${id}`);
	return res.data;
};