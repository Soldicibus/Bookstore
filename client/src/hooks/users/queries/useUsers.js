import { useQuery } from "@tanstack/react-query";
import * as userAPI from "../../../api/userAPI.js";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: userAPI.getAllUsers,
  });
}