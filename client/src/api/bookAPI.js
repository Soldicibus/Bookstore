import api from "./lib/api.js";

export const getAllBooks = async () => {
	const res = await api.get("/books");
	return res.data.books || res.data;
};

export const getBookById = async (id) => {
	const res = await api.get(`/books/${id}`);
	// Handle both wrapped and unwrapped responses
	return res.data.book || res.data.data || res.data;
};

export const createBook = async (payload) => {
	const res = await api.post("/books", payload);
	return res.data;
};

export const updateBook = async (id, payload) => {
	const res = await api.patch(`/books/${id}`, payload);
	return res.data;
};

export const deleteBook = async (id) => {
	const res = await api.delete(`/books/${id}`);
	return res.data;
};

export const addAuthorToBook = async (bookId, authorId) => {
	const res = await api.post(`/books/${bookId}/add-author`, { authorId });
	return res.data;
};

export const removeAuthorFromBook = async (bookId, authorId) => {
	const res = await api.post(`/books/${bookId}/remove-author`, { authorId });
	return res.data;
};

export const addGenreToBook = async (bookId, genreId) => {
	const res = await api.post(`/books/${bookId}/add-genre`, { genreId });
	return res.data;
};

export const removeGenreFromBook = async (bookId, genreId) => {
	const res = await api.post(`/books/${bookId}/remove-genre`, { genreId });
	return res.data;
};

export const addThematicToBook = async (bookId, thematicId) => {
	const res = await api.post(`/books/${bookId}/add-thematic`, { thematicId });
	return res.data;
};

export const removeThematicFromBook = async (bookId, thematicId) => {
	const res = await api.post(`/books/${bookId}/remove-thematic`, { thematicId });
	return res.data;
};

// Filtering endpoints
export const getBooksByGenre = async (genreId) => {
	const res = await api.get(`/books/genre/${genreId}`);
	return res.data.books || res.data;
};

export const getBooksByThematic = async (thematicId) => {
	const res = await api.get(`/books/thematic/${thematicId}`);
	return res.data.books || res.data;
};

export const getBooksByAuthor = async (authorId) => {
	const res = await api.get(`/books/author/${authorId}`);
	return res.data.books || res.data;
};

export const getAuthorsByBook = async (bookId) => {
	const res = await api.get(`/books/${bookId}/authors`);
	return res.data.authors || res.data;
};

export const addToFavorites = async (bookId, userId) => {
	const res = await api.post(`/books/favorite/${bookId}/${userId}`);
	return res.data;
};

export const removeFromFavorites = async (bookId, userId) => {
	const res = await api.delete(`/books/favorite/${bookId}/${userId}`);
	return res.data;
};

export const getFavorites = async () => {
	const res = await api.get(`/books/favorites`);
	return res.data.books || res.data;
};

export const getFavoriteBooks = async (userId) => {
	const res = await api.get(`/books/favorite/${userId}`);
	return res.data.books || res.data;
}