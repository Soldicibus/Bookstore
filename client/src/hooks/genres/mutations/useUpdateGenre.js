import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as genreAPI from "../../../api/genreAPI.js";

export function useUpdateGenre() {
  const qc = useQueryClient();
  return useMutation(({ id, payload }) => genreAPI.updateGenre(id, payload), {
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries(["genres"]);
      const previous = qc.getQueryData(["genres"]);
      qc.setQueryData(["genres"], (old = []) => old.map((g) => (g.id === id ? { ...g, ...payload } : g)));
      qc.setQueryData(["genre", id], (old) => ({ ...old, ...payload }));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["genres"], context.previous);
    },
    onSettled: (data, error, variables) => {
      qc.invalidateQueries(["genres"]);
      qc.invalidateQueries(["genre", variables.id]);
    },
  });
}
