import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as reviewAPI from "../../../api/reviewAPI.js";

export function useUpdateReview() {
  const qc = useQueryClient();
  return useMutation(({ id, payload }) => reviewAPI.updateReview(id, payload), {
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries(["reviews"]);
      const previous = qc.getQueryData(["reviews"]);
      qc.setQueryData(["reviews"], (old = []) => old.map((r) => (r.id === id ? { ...r, ...payload } : r)));
      qc.setQueryData(["review", id], (old) => ({ ...old, ...payload }));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["reviews"], context.previous);
    },
    onSettled: (data, error, variables) => {
      qc.invalidateQueries(["reviews"]);
      qc.invalidateQueries(["review", variables.id]);
    },
  });
}
