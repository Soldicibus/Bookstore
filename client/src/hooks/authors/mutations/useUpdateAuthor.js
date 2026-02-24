import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authorAPI from "../../../api/authorAPI.js";

export function useUpdateAuthor() {
  const qc = useQueryClient();
  return useMutation(({ id, payload }) => authorAPI.updateAuthor(id, payload), {
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries(["authors"]);
      const previous = qc.getQueryData(["authors"]);
      qc.setQueryData(["authors"], (old = []) => old.map((a) => (a.id === id ? { ...a, ...payload } : a)));
      qc.setQueryData(["author", id], (old) => ({ ...old, ...payload }));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["authors"], context.previous);
    },
    onSettled: (data, error, variables) => {
      qc.invalidateQueries(["authors"]);
      qc.invalidateQueries(["author", variables.id]);
    },
  });
}
