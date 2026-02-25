import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as themeAPI from "../../../api/themeAPI.js";

export function useDeleteTheme() {
  const qc = useQueryClient();
  return useMutation((id) => themeAPI.deleteTheme(id), {
    onMutate: async (id) => {
      await qc.cancelQueries(["themes"]);
      const previous = qc.getQueryData(["themes"]);
      qc.setQueryData(["themes"], (old = []) => old.filter((t) => t.id !== id));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["themes"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["themes"]),
  });
}
