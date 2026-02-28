import { useQuery } from "@tanstack/react-query";
import * as authAPI from "../../../api/auth.js";

export function useMe() {
  const token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
  
  return useQuery({
    queryKey: ["me"],
    queryFn: () => authAPI.me(),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
