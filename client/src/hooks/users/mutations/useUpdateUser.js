import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as userAPI from "../../../api/userAPI.js";

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userAPI.updateUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}