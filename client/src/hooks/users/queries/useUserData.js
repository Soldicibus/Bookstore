import { useQuery } from "@tanstack/react-query";
import * as userAPI from "../../../api/userAPI.js";

export function useUserData(id) {
  return useQuery({
    queryKey: ["user-data", id],
    queryFn: () => userAPI.getUserData(id),
    enabled: !!id,
  });
}