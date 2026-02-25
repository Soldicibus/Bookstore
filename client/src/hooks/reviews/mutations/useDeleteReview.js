import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as reviewAPI from "../../../api/reviewAPI.js";

export function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation((id) => reviewAPI.deleteReview(id), {
    onMutate: async (id) => {
      await qc.cancelQueries(["reviews"]);
      const previous = qc.getQueryData(["reviews"]);
      qc.setQueryData(["reviews"], (old = []) => old.filter((r) => r.id !== id));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["reviews"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["reviews"]),
  });
}
