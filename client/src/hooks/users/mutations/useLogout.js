import { useQueryClient } from "@tanstack/react-query";
import * as authAPI from "../../../api/auth.js";

export function useLogout() {
  const qc = useQueryClient();
  return async () => {
    await authAPI.logout();
    // clear react-query cache and redirect to auth page
    try { qc.clear(); } catch (e) {}
    if (typeof window !== 'undefined') {
      window.location.href = '/auth';
    }
  };
}
