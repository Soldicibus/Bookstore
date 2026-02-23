import axios from "axios";
import { redirect } from "react-router-dom";

const api = axios.create({
  baseURL: import.meta.env?.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (import.meta.env?.VITE_API_DEV === 'true') {
      console.log(
        `-> ${config.method.toUpperCase()} ${config.url}`,
        config.params || config.data,
      );
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    if (import.meta.env?.VITE_API_DEV === 'true') {
      console.log(
        `<- ${response.config.method.toUpperCase()} ${response.config.url}`,
        response.data,
      );
    }
    return response;
  },
  (error) => {
    // Attempt to extract a more detailed error message from the server response
    if (error.response?.data) {
      const data = error.response.data;
      let detailedMessage = '';

      if (typeof data === 'string') {
        detailedMessage = data;
      } else {
        // Check standard error fields
        detailedMessage = data.error || data.message || '';

        // Check for field-specific validation errors
        if (data.fields) {
          const fieldsStr = typeof data.fields === 'object' 
            ? JSON.stringify(data.fields) 
            : String(data.fields);
          detailedMessage += detailedMessage ? ` (Fields: ${fieldsStr})` : `Fields: ${fieldsStr}`;
        }
        
        // Check for access/permission details
        if (data.access) {
           const accessStr = typeof data.access === 'object'
             ? JSON.stringify(data.access)
             : String(data.access);
           detailedMessage += detailedMessage ? ` (Access: ${accessStr})` : `Access: ${accessStr}`;
        }
      }

      if (detailedMessage) {
        error.message = detailedMessage;
      }
    }

    if (error.response?.status === 401) {
      console.log("Unauthorized - logging out");

      localStorage.removeItem("accessToken");

      redirect("/login");
    }

    if (error.response?.status === 403) {
      console.log("Access forbidden", error.message);
    }

    if (error.response?.status === 404) {
      console.log("Resource not found", error.message);
    }

    if (error.response?.status === 500) {
      console.log("Server error", error.message);
    }

    if (!error.response) {
      console.log("Network error - server not reachable" + (error.message ? `: ${error.message}` : ""));
    }

    return Promise.reject(error);
  },
);

export default api;
