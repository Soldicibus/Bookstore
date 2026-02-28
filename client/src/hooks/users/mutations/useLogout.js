import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authAPI from "../../../api/auth.js";

export function useLogout() {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      return await authAPI.logout();
    },
    onSuccess: () => {
      // clear react-query cache
      qc.clear();
      // redirect to auth page
      if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Still redirect even if server logout fails
      qc.clear();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }
    },
  });
}
