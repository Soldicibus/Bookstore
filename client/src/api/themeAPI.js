import api from "./lib/api.js";

export const getThemes = async () => {
  try {
    const response = await api.get("/themes");
    return response.data;
  } catch (error) {
    console.error("Error fetching themes:", error);
    throw error;
  }
};

export const getThemeById = async (id) => {
  try {
    const response = await api.get(`/themes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching theme by ID:", error);
    throw error;
  }
};

export const createTheme = async (themeData) => {
  try {
    const response = await api.post("/themes", themeData);
    return response.data;
  } catch (error) {
    console.error("Error creating theme:", error);
    throw error;
  }
};

export const updateTheme = async (id, themeData) => {
  try {
    const response = await api.patch(`/themes/${id}`, themeData);
    return response.data;
  } catch (error) {
    console.error("Error updating theme:", error);
    throw error;
  }
};

export const deleteTheme = async (id) => {
  try {
    const response = await api.delete(`/themes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting theme:", error);
    throw error;
  }
};
