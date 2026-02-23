import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as userAPI from "../../../api/userAPI.js";

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userAPI.deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}