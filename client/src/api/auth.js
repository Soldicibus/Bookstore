import api from "./lib/api.js";

export const login = async ({ username, email, password }) => {
  const payload = { username, email, password };
  const res = await api.post("/auth/login", payload);
  const data = res.data;

  if (data?.accessToken) localStorage.setItem("accessToken", data.accessToken);

  return data;
};

export const register = async ({ username, email, password }) => {
  const payload = { username, email, password };
  const res = await api.post("/auth/register", payload);
  return res.data;
};

export const refreshToken = async (refreshToken) => {
  const res = await api.post("/auth/refresh");
  return res.data;
};

export const me = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (e) {
    // ignore any server errors on logout
  }
  localStorage.removeItem("accessToken");
  return true;
};
export const handleRoleSwitch = async (targetRole) => {
  try {
    const request = await api.post("/auth/switch-role", { targetRole });

    localStorage.setItem("accessToken", request.data.accessToken);

    setActiveRole(request.data.activeRole);

    window.location.reload();
  } catch (err) {
    console.error("Switch failed", err);
  }
};
