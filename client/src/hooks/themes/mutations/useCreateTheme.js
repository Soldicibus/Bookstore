import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as themeAPI from "../../../api/themeAPI.js";

export function useCreateTheme() {
  const qc = useQueryClient();
  return useMutation((payload) => themeAPI.createTheme(payload), {
    onMutate: async (newTheme) => {
      await qc.cancelQueries(["themes"]);
      const previous = qc.getQueryData(["themes"]);
      qc.setQueryData(["themes"], (old = []) => [...old, newTheme]);
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["themes"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["themes"]),
  });
}
