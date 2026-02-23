import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authAPI from "../../../api/auth.js";

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      qc.invalidateQueries();
    },
  });
}
