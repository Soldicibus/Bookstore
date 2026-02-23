import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as userAPI from "../../../api/userAPI.js";

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userAPI.createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}