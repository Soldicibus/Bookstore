export function decodeToken(token) {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    // atob may throw if input isn't properly padded
    const decoded = atob(base64);
    // Percent-encode to get proper utf-8 handling
    const json = decodeURIComponent(decoded.split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(json);
  } catch (err) {
    return null;
  }
}
