import { decodeToken } from './jwt';

export function getCurrentUser() {
  try {
    const token = localStorage.getItem('accessToken');
    return token ? decodeToken(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  const user = getCurrentUser();
  return Boolean(user && (user.userId || user.id || user.sub || user.user_id));
}
