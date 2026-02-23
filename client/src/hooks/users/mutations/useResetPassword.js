import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as userAPI from "../../../api/userAPI.js";

export function useResetPassword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userAPI.resetPassword,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}