import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useUpdateBook() {
  const qc = useQueryClient();
  return useMutation(({ id, payload }) => bookAPI.updateBook(id, payload), {
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries(["books"]);
      const previous = qc.getQueryData(["books"]);
      qc.setQueryData(["books"], (old = []) => old.map((b) => (b.id === id ? { ...b, ...payload } : b)));
      qc.setQueryData(["book", id], (old) => ({ ...old, ...payload }));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["books"], context.previous);
    },
    onSettled: (data, error, variables) => {
      qc.invalidateQueries(["books"]);
      qc.invalidateQueries(["book", variables.id]);
    },
  });
}
