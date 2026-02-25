import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as genreAPI from "../../../api/genreAPI.js";

export function useCreateGenre() {
  const qc = useQueryClient();
  return useMutation((payload) => genreAPI.createGenre(payload), {
    onMutate: async (newGenre) => {
      await qc.cancelQueries(["genres"]);
      const previous = qc.getQueryData(["genres"]);
      qc.setQueryData(["genres"], (old = []) => [...old, newGenre]);
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["genres"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["genres"]),
  });
}
