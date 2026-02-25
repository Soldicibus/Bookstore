import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as reviewAPI from "../../../api/reviewAPI.js";

export function useCreateReview() {
  const qc = useQueryClient();
  return useMutation((payload) => reviewAPI.createReview(payload), {
    onMutate: async (newReview) => {
      await qc.cancelQueries(["reviews"]);
      const previous = qc.getQueryData(["reviews"]);
      qc.setQueryData(["reviews"], (old = []) => [...old, newReview]);
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["reviews"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["reviews"]),
  });
}
