import { useQuery } from "@tanstack/react-query";
import * as userAPI from "../../../api/userAPI.js";

export function useUser(id) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userAPI.getUserById(id),
    enabled: !!id,
  });
}