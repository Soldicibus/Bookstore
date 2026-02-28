import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authAPI from "../../../api/auth.js";

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
