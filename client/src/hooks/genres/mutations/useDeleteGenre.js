import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as genreAPI from "../../../api/genreAPI.js";

export function useDeleteGenre() {
  const qc = useQueryClient();
  return useMutation((id) => genreAPI.deleteGenre(id), {
    onMutate: async (id) => {
      await qc.cancelQueries(["genres"]);
      const previous = qc.getQueryData(["genres"]);
      qc.setQueryData(["genres"], (old = []) => old.filter((g) => g.id !== id));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["genres"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["genres"]),
  });
}
