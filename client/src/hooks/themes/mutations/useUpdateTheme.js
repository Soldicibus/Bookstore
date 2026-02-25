import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as themeAPI from "../../../api/themeAPI.js";

export function useUpdateTheme() {
  const qc = useQueryClient();
  return useMutation(({ id, payload }) => themeAPI.updateTheme(id, payload), {
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries(["themes"]);
      const previous = qc.getQueryData(["themes"]);
      qc.setQueryData(["themes"], (old = []) => old.map((t) => (t.id === id ? { ...t, ...payload } : t)));
      qc.setQueryData(["theme", id], (old) => ({ ...old, ...payload }));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["themes"], context.previous);
    },
    onSettled: (data, error, variables) => {
      qc.invalidateQueries(["themes"]);
      qc.invalidateQueries(["theme", variables.id]);
    },
  });
}
