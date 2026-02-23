import api from "./lib/api.js";

export const getAllUsers = async () => {
  const request = await api.get("/users");
  return request.data.users;
};

export const getUserById = async (id) => {
  const request = await api.get(`/users/${id}`);
  return request.data;
};

export const getUserData = async (id) => {
  const request = await api.get(`/users/${id}/data`);
  return request.data;
};

export const createUser = async ({ username, email, password }) => {
  const request = await api.post("/users", {
    username,
    email,
    password,
  });
  return request.data;
};
export const resetPassword = async ({ userId, newPassword }) => {
  const request = await api.post("/users/reset-password", {
    userId,
    newPassword,
  });
  return request.data;
};

export const updateUser = async ({ id, username, email, password }) => {
  const request = await api.patch(`/users/${id}`, {
    username,
    email,
    password,
  });
  return request.data;
};

export const deleteUser = async (id) => {
  const request = await api.delete(`/users/${id}`);
  return request.data;
};
